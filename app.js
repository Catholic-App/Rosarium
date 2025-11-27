/* ============================================================
   app.js - Rosarium (versão integrada)
   Contém:
    - Storage util
    - PIN simples
    - Anotações (localStorage)
    - Confissão (localStorage)
    - Lectio Divina (localStorage)
    - Terços (estrutura + funções para vincular UI)
    - Registro / Calendário de terços (localStorage)
    - Santo do Dia loader (busca JSONs: oficiais + fallback)
    - Liturgia do Dia (fetch API externa com fallback)
   ============================================================ */

window.App = window.App || {};

(function (App) {
  'use strict';

  /* ============================
     STORAGE UTIL
  ============================ */
  const Storage = {
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.error('Storage.set error', e);
      }
    },
    get(key, def = null) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : def;
      } catch (e) {
        console.error('Storage.get error', e);
        return def;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Storage.remove error', e);
      }
    }
  };

  /* ============================
     PIN (simples)
  ============================ */
  const PIN = {
    key: 'rosarium_pin',
    defaultPin: '1234',
    getPin() {
      return Storage.get(this.key, this.defaultPin) || this.defaultPin;
    },
    setPin(pin) {
      Storage.set(this.key, String(pin).slice(0, 4));
    },
    verify(pin) {
      return String(pin) === this.getPin();
    }
  };

  App.PIN = PIN;

  /* ============================
     ANOTAÇÕES
  ============================ */
  const Anotacoes = {
    key: 'rosarium_anotacoes',
    getAll() {
      return Storage.get(this.key, []);
    },
    saveAll(arr) {
      Storage.set(this.key, arr || []);
    },
    add(titulo, conteudo) {
      const arr = this.getAll();
      const item = {
        id: Date.now(),
        titulo: titulo || 'Sem título',
        conteudo: conteudo || '',
        data: new Date().toISOString()
      };
      arr.push(item);
      this.saveAll(arr);
      return item;
    },
    update(id, titulo, conteudo) {
      const arr = this.getAll();
      const i = arr.findIndex(x => x.id === id);
      if (i === -1) return false;
      arr[i].titulo = titulo || arr[i].titulo;
      arr[i].conteudo = conteudo || arr[i].conteudo;
      arr[i].data = new Date().toISOString();
      this.saveAll(arr);
      return true;
    },
    delete(id) {
      let arr = this.getAll();
      arr = arr.filter(x => x.id !== id);
      this.saveAll(arr);
    }
  };

  App.Anotacoes = Anotacoes;

  /* ============================
     CONFISSÃO
  ============================ */
  const Confissao = {
    key: 'rosarium_confissoes',
    getAll() {
      return Storage.get(this.key, []);
    },
    save(item) {
      const arr = this.getAll();
      arr.push(Object.assign({ id: Date.now(), data_registro: new Date().toISOString() }, item));
      Storage.set(this.key, arr);
    },
    clearAll() {
      Storage.remove(this.key);
    }
  };

  App.Confissao = Confissao;

  /* ============================
     LECTIO DIVINA
  ============================ */
  const LectioDivina = {
    key: 'rosarium_lectio',
    get() {
      return Storage.get(this.key, { leitura: '', meditacao: '', oracao: '', contemplacao: '' });
    },
    save(obj) {
      Storage.set(this.key, obj);
    }
  };

  App.LectioDivina = LectioDivina;

  /* ============================
     TERÇOS (infra)
     - fornece helpers para qualquer terço
     - cada terço pode criar sua própria SEQ e renderização
  ============================ */
  const Terco = {
    // salvar estado de um terço (por id chave)
    saveState(key, stateObj) {
      Storage.set('terco_state_' + key, stateObj);
    },
    loadState(key, def = { stepIndex: 0 }) {
      return Storage.get('terco_state_' + key, def);
    },

    // Gera beads array a partir de uma SEQ (array de strings) - decide quais passos têm bead
    buildBeadsFromSEQ(SEQ) {
      const arr = [];
      for (let i = 0; i < SEQ.length; i++) {
        const t = SEQ[i];
        // quais tipos viram beads? pn_init, am_init, credo_init, grande, pequena
        if (['pn_init', 'am_init', 'credo_init', 'grande', 'pequena'].includes(t)) {
          arr.push({ step: i, type: t });
        }
      }
      return arr;
    },

    // calcula percent
    pctForStep(stepIndex, seqLen) {
      return Math.round(((stepIndex + 1) / seqLen) * 100);
    },

    // função padrão para registrar terço completo (usa Calendar module)
    onTercoComplete(tipo) {
      try {
        registrarTercoRezados(tipo); // função global definida abaixo
      } catch (e) {
        console.warn('registrarTercoRezados não disponível', e);
      }
    }
  };

  App.Terco = Terco;

  /* ============================
     CALENDÁRIO / REGISTRO DE TERÇOS (LOCAL)
     Schema (localStorage key 'rosarium_calendar'):
     {
       "YYYY-MM-DD": [
         { tipo: "misericordia"|"mariano"|..., count:1, hora: "ISO", meta: {...} }
       ],
       ...
     }
  ============================ */
  const Calendar = {
    key: 'rosarium_calendar',

    _load() {
      return Storage.get(this.key, {});
    },
    _save(obj) {
      Storage.set(this.key, obj);
    },

    registrar(tipo, meta = {}) {
      const data = new Date();
      const dayKey = data.toISOString().slice(0, 10); // YYYY-MM-DD
      const store = this._load();
      store[dayKey] = store[dayKey] || [];
      store[dayKey].push({
        tipo: tipo || 'terco',
        hora: data.toISOString(),
        meta
      });
      this._save(store);
      return true;
    },

    // retorna vetor de registros entre datas (inclusive). Params as ISO 'YYYY-MM-DD' or Date
    queryRange(from, to) {
      const store = this._load();
      const fromISO = (from instanceof Date) ? from.toISOString().slice(0, 10) : from;
      const toISO = (to instanceof Date) ? to.toISOString().slice(0, 10) : to;
      const out = [];
      for (const k of Object.keys(store)) {
        if (k >= fromISO && k <= toISO) {
          out.push({ dia: k, entries: store[k] });
        }
      }
      out.sort((a, b) => a.dia.localeCompare(b.dia));
      return out;
    },

    // retorna registros de um mês (year, monthNumber 1-12)
    getMonth(year, month) {
      const store = this._load();
      const mm = String(month).padStart(2, '0');
      const prefix = year + '-' + mm + '-';
      const out = [];
      for (const k of Object.keys(store)) {
        if (k.startsWith(prefix)) out.push({ dia: k, entries: store[k] });
      }
      out.sort((a, b) => a.dia.localeCompare(b.dia));
      return out;
    },

    clearAll() {
      Storage.remove(this.key);
    }
  };

  App.Calendar = Calendar;

  // função global usada por terços
  function registrarTercoRezados(tipo = 'terco', meta = {}) {
    return Calendar.registrar(tipo, meta);
  }
  App.registrarTercoRezados = registrarTercoRezados;
  window.registrarTercoRezados = registrarTercoRezados;

  /* ============================
     TERÇO MARIANO (exemplo de implementação)
     - SEQ definida conforme rosário tradicional:
       sinal, credo (or other initial sequence depends on your config),
       then 5*(grande + 10*pequena + gloria)
  ============================ */
  const TercoMariano = (function () {
    const ORACOES = {
      sinal: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      credo: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor... Amém.',
      pn: 'Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino... Amém.',
      am: 'Ave Maria, cheia de graça, o Senhor é convosco... Amém.',
      gloria: 'Glória ao Pai, ao Filho e ao Espírito Santo. Amém.'
    };

    const SEQ = (function () {
      const s = [];
      s.push('sinal');
      s.push('credo');
      s.push('pn_init'); // pai-nosso inicial
      s.push('am_init'); // ave inicial 1
      s.push('am_init'); // ave inicial 2
      s.push('am_init'); // ave inicial 3
      s.push('gloria_init'); // glória inicial (opcional)

      for (let d = 0; d < 5; d++) {
        s.push('grande'); // conta grande - Eterno Pai (or Fn)
        for (let i = 0; i < 10; i++) s.push('pequena');
        s.push('gloria');
      }
      return s;
    })();

    const key = 'terco_mariano';

    function loadState() {
      return Terco.loadState(key, { stepIndex: 0 });
    }
    function saveState(s) {
      Terco.saveState(key, s);
    }

    function getCurrentStep(state) {
      return SEQ[state.stepIndex];
    }

    return {
      key,
      SEQ,
      ORACOES,
      loadState,
      saveState,
      getCurrentStep,
      advance(state) {
        if (state.stepIndex >= SEQ.length - 1) {
          Terco.onTercoComplete('mariano');
          state.stepIndex = 0;
          saveState(state);
          return state;
        }
        state.stepIndex++;
        saveState(state);
        return state;
      },
      reset(state) {
        state.stepIndex = 0;
        saveState(state);
        return state;
      }
    };
  })();

  App.TercoMariano = TercoMariano;

  /* ============================
     TERÇO DA MISERICÓRDIA (exemplo)
     SEQ conforme acordado: sinal, pn_init, am_init, credo_init, 5*(grande + 10*pequena + gloria), santo_deus, o_sangue
  ============================ */
  const TercoMisericordia = (function () {
    const ORACOES = {
      sinal: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      pai_nosso: 'Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino... Amém.',
      ave: 'Ave Maria, cheia de graça, o Senhor é convosco... Amém.',
      credo: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor... Amém.',
      eterno_pai: 'Eterno Pai, ofereço-vos o Corpo e o Sangue, a Alma e a Divindade de Nosso Senhor Jesus Cristo, em expiação pelos nossos pecados e pelos do mundo inteiro.',
      pela_paixao: 'Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.',
      gloria: 'Glória ao Pai. Amém.',
      santo_deus: 'Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.',
      o_sangue_e_agua: 'Ó Sangue e Água, que brotastes do Coração de Jesus como fonte de misericórdia para nós, confio em Vós. Amém.'
    };

    const SEQ = (function () {
      const s = [];
      s.push('sinal');       // 0
      s.push('pn_init');     // 1
      s.push('am_init');     // 2
      s.push('credo_init');  // 3 (bolinha com cruz - grande)
      for (let d = 0; d < 5; d++) {
        s.push('grande'); // Eterno Pai
        for (let i = 0; i < 10; i++) s.push('pequena');
        s.push('gloria');
      }
      s.push('santo_deus');
      s.push('o_sangue');
      return s;
    })();

    const key = 'terco_misericordia';

    function loadState() { return Terco.loadState(key, { stepIndex: 0 }); }
    function saveState(s) { Terco.saveState(key, s); }

    return {
      key,
      SEQ,
      ORACOES,
      loadState,
      saveState,
      advance(state) {
        if (state.stepIndex >= SEQ.length - 1) {
          Terco.onTercoComplete('misericordia');
          state.stepIndex = 0;
          saveState(state);
          return state;
        }
        state.stepIndex++;
        saveState(state);
        return state;
      },
      reset(state) {
        state.stepIndex = 0;
        saveState(state);
        return state;
      }
    };
  })();

  App.TercoMisericordia = TercoMisericordia;

  /* ============================
     SANTO DO DIA LOADER
     - carrega data/santos_oficiais.json e data/santos_fallback.json
     - expõe App.SantoDoDia API (async)
  ============================ */
  (function SantoDoDiaLoader() {
    const PATH_OFICIAIS = '/data/santos_oficiais.json';
    const PATH_EXTRA = '/data/santos_fallback.json';
    let memory = { oficiais: {}, extra: {}, indexOficiais: {}, indexExtra: {} };

    function pad(n) { return String(n).padStart(2, '0'); }
    function keyForDate(d) {
      const dt = d ? new Date(d) : new Date();
      return pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
    }

    async function fetchJson(url) {
      try {
        const r = await fetch(url, { cache: 'no-cache' });
        if (!r.ok) throw new Error('fetch failed ' + url);
        return await r.json();
      } catch (e) {
        console.warn('fetchJson failed', url, e);
        return null;
      }
    }

    function buildIndex(obj) {
      const out = {};
      if (!obj) return out;
      for (const k of Object.keys(obj)) {
        const v = obj[k];
        // normalize: if array, copy; if single, wrap
        if (Array.isArray(v)) out[k] = v.map(x => Object.assign({}, x, { _key: k }));
        else out[k] = [Object.assign({}, v, { _key: k })];
      }
      return out;
    }

    async function ensureLoaded() {
      if (ensureLoaded._promise) return ensureLoaded._promise;
      ensureLoaded._promise = Promise.allSettled([fetchJson(PATH_OFICIAIS), fetchJson(PATH_EXTRA)])
        .then(results => {
          const [r1, r2] = results;
          memory.oficiais = (r1.status === 'fulfilled' && r1.value) ? r1.value : {};
          memory.extra = (r2.status === 'fulfilled' && r2.value) ? r2.value : {};
          memory.indexOficiais = buildIndex(memory.oficiais);
          memory.indexExtra = buildIndex(memory.extra);
          return memory;
        });
      return ensureLoaded._promise;
    }

    function generateGeneric(key) {
      return {
        nome: 'Santo(a) não listado(a)',
        bio: 'Hoje não há um santo específico cadastrado neste aplicativo para a data selecionada.',
        oracao: 'Senhor, que a intercessão dos santos nos acompanhe sempre. Amém.',
        img: '/img/santos/placeholder.jpg',
        _key: key,
        _generated: true
      };
    }

    App.SantoDoDia = {
      // retorna array (pode ser vazio)
      async getSantosByDate(dateArg) {
        await ensureLoaded();
        const key = keyForDate(dateArg);

        const oficiais = memory.indexOficiais[key] || [];
        const extras = memory.indexExtra[key] || [];

        if (oficiais.length === 0 && extras.length === 0) {
          return [generateGeneric(key)];
        }
        if (oficiais.length > 0) return oficiais.concat(extras);
        return extras;
      },

      async getSantoDoDia(dateArg) {
        const arr = await this.getSantosByDate(dateArg);
        return arr.length ? arr[0] : generateGeneric(keyForDate(dateArg));
      },

      async getSantosDoMes(yearArg, monthArg) {
        await ensureLoaded();
        const today = new Date();
        const year = (typeof yearArg === 'number') ? yearArg : today.getFullYear();
        const month = (typeof monthArg === 'number') ? monthArg : today.getMonth(); // 0-based
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const out = [];
        for (let d = 1; d <= daysInMonth; d++) {
          const k = pad(month + 1) + '-' + pad(d);
          const oficiais = memory.indexOficiais[k] || [];
          const extras = memory.indexExtra[k] || [];
          if (oficiais.length === 0 && extras.length === 0) out.push({ dia: d, entries: [generateGeneric(k)] });
          else if (oficiais.length > 0) out.push({ dia: d, entries: oficiais.concat(extras) });
          else out.push({ dia: d, entries: extras });
        }
        return out;
      },

      // adiciona santo extra persistente (localStorage)
      async setSanto(keyOrDate, data) {
        await ensureLoaded();
        let key = keyOrDate;
        if (keyOrDate instanceof Date) key = pad(keyOrDate.getMonth() + 1) + '-' + pad(keyOrDate.getDate());
        if (!/^\d\d-\d\d$/.test(key)) throw new Error('Chave inválida');
        memory.indexExtra[key] = memory.indexExtra[key] || [];
        memory.indexExtra[key].push(Object.assign({}, data, { _key: key }));
        // persistir extras customizados
        try {
          const flat = {};
          for (const k of Object.keys(memory.indexExtra)) {
            flat[k] = memory.indexExtra[k].map(x => {
              const c = Object.assign({}, x); delete c._key; return c;
            });
          }
          localStorage.setItem('app_santos_custom', JSON.stringify(flat));
        } catch (e) {
          console.warn('não foi possível salvar santos customizados', e);
        }
      },

      // carregar custom caso exista (chamado ao init)
      _loadCustom() {
        try {
          const raw = localStorage.getItem('app_santos_custom');
          if (!raw) return;
          const parsed = JSON.parse(raw);
          for (const k of Object.keys(parsed)) {
            memory.indexExtra[k] = memory.indexExtra[k] || [];
            const arr = parsed[k].map(item => Object.assign({}, item, { _key: k }));
            memory.indexExtra[k] = memory.indexExtra[k].concat(arr);
          }
        } catch (e) { /* ignore */ }
      }
    };

    // auto load
    ensureLoaded().then(() => {
      App.SantoDoDia._loadCustom();
    }).catch(e => {
      console.warn('SantoDoDia load error', e);
      App.SantoDoDia._loadCustom();
    });

  })();

  /* ============================
     LITURGIA DO DIA (exemplo de fetch)
     - função util que pode ser chamada pelas páginas
  ============================ */
  async function getLiturgia(dia, mes, ano) {
    try {
      const url = `https://liturgia.acolitos.com.br/api/liturgia?dia=${dia}&mes=${mes}&ano=${ano}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error('Liturgia API não disponível');
      const data = await r.json();
      return {
        titulo: data.titulo || 'Liturgia do Dia',
        leituras: data.leituras || [],
        evangelho: data.evangelho || ''
      };
    } catch (e) {
      console.warn('getLiturgia error', e);
      return { titulo: 'Liturgia do Dia', leituras: [], evangelho: '' };
    }
  }

  App.getLiturgia = getLiturgia;

  /* ============================
     UTIL - formato data legível pt-BR
  ============================ */
  function formatDateBR(isoOrDate) {
    const d = (isoOrDate instanceof Date) ? isoOrDate : new Date(isoOrDate);
    return d.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  App.formatDateBR = formatDateBR;

  /* ============================
     INICIALIZAÇÃO GERAL (opcional)
  ============================ */
  function initApp() {
    console.info('App Rosarium inicializado (app.js integrado)');
    // pré-carregar santo do dia em background (não bloqueante)
    if (App.SantoDoDia && App.SantoDoDia.getSantoDoDia) {
      App.SantoDoDia.getSantoDoDia().catch(() => { /* ignore */ });
    }
  }

  // start
  document.addEventListener('DOMContentLoaded', initApp);

  /* ============================
     EXPOR NO APP
  ============================ */
  App.Storage = Storage;
  App.PIN = PIN;
  App.Calendar = Calendar;
  App.Terco = Terco;
  App.Confissao = Confissao;
  App.Anotacoes = Anotacoes;
  App.LectioDivina = LectioDivina;
  App.TercoMariano = TercoMariano;
  App.TercoMisericordia = TercoMisericordia;

})(window.App);
/* ============================================
   SISTEMA DE REGISTRO DO CALENDÁRIO DE TERÇOS
   ============================================ */

const CAL_KEY = "rosarium_calendario_tercos_v2";

/*
Formato salvo:

{
  "2025-02-14": {
      quantidade: 3,
      tipos: ["mariano","misericordia","mariano"]
  },
  "2025-02-15": {
      quantidade: 1,
      tipos: ["mariano"]
  }
}
*/

function loadCalendario() {
  const raw = localStorage.getItem(CAL_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveCalendario(data) {
  localStorage.setItem(CAL_KEY, JSON.stringify(data));
}

/**
 * Registrar um terço rezado
 * tipo = 'mariano' | 'misericordia' | 'rosario'
 */
window.registrarTercoRezados = function (tipo) {
  const hoje = new Date();
  const dataStr = hoje.toISOString().split("T")[0]; // formato YYYY-MM-DD

  const cal = loadCalendario();

  if (!cal[dataStr]) {
    cal[dataStr] = { quantidade: 0, tipos: [] };
  }

  cal[dataStr].quantidade++;
  cal[dataStr].tipos.push(tipo);

  saveCalendario(cal);
};


/* ============================================
   FUNÇÕES PARA O ARQUIVO calendario-terco.html
   ============================================ */

window.Calendario = {
  getDiasDoMes(ano, mes) {
    const dias = [];
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let i = 1; i <= ultimoDia; i++) {
      dias.push(i);
    }
    return dias;
  },

  getRegistrosDoMes(ano, mes) {
    const cal = loadCalendario();
    const dados = [];

    for (const data in cal) {
      const d = new Date(data);
      if (d.getFullYear() === ano && d.getMonth() === mes) {
        dados.push({
          dia: d.getDate(),
          quantidade: cal[data].quantidade,
          tipos: cal[data].tipos
        });
      }
    }

    return dados;
  }
};