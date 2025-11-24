/* ============================================
   APP.JS — CORREÇÃO COMPLETA (PIN, goBack, storage)
   Substitua 100% do seu app.js por este arquivo
   ============================================ */

/* =========================
   STORAGE (deve vir primeiro)
   ========================= */
const Storage = {
  set: (key, val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.error('Storage.set error', e);
      return false;
    }
  },

  get: (key, def = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : def;
    } catch (e) {
      console.error('Storage.get error', e);
      return def;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage.remove error', e);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Storage.clear error', e);
      return false;
    }
  }
};

/* =========================
   UTILITÁRIOS GERAIS
   ========================= */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function goBack() {
  try {
    // se houver histórico, volta
    if (document.referrer && document.referrer !== "") {
      window.history.back();
    } else {
      // fallback seguro: tenta home.html, index.html ou raiz
      const possible = ['home.html', 'index.html', '/'];
      for (const p of possible) {
        // tenta redirecionar; se arquivo não existir, navegador mostra 404 mas evita travar
        window.location.href = p;
        return;
      }
    }
  } catch (e) {
    console.error('goBack error', e);
    window.location.href = 'home.html';
  }
}

/* =========================
   ORAÇÕES / FRASES / MISTÉRIOS
   (mantive resumido onde já estava)
   ========================= */
const ORACOES = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; ...",
  pai_nosso: "Pai nosso, que estais nos céus...",
  ave_maria: "Ave Maria, cheia de graça...",
  gloria_ao_pai: "Glória ao Pai, ao Filho e ao Espírito Santo...",
  o_meu_jesus: "Ó meu Jesus, perdoai-nos...",
  eterno_pai: "Eterno Pai, ofereço-vos...",
  pela_sua_dolorosa_paixao: "Pela sua dolorosa Paixão...",
  santo_deus: "Santo Deus, Santo Forte...",
  o_sangue_e_agua: "Ó Sangue e Água..."
};

const SAINT_QUOTES = [
  { quote: "Tudo posso naquele que me fortalece.", saint: "São Paulo" },
  { quote: "Reze, espere e não se preocupe.", saint: "São Padre Pio" },
  { quote: "Quem canta, ora duas vezes.", saint: "Santo Agostinho" }
];

const MISTERIOS = {
  gozosos: [
    { numero: 1, nome: "Anunciação", descricao: "O Anjo Gabriel anuncia a Maria.", virtude: "Humildade" },
    { numero: 2, nome: "Visitação", descricao: "Maria visita Isabel.", virtude: "Caridade" },
    { numero: 3, nome: "Nascimento de Jesus", descricao: "Jesus nasce em Belém.", virtude: "Pobreza" },
    { numero: 4, nome: "Apresentação", descricao: "Jesus é apresentado no Templo.", virtude: "Obediência" },
    { numero: 5, nome: "Perda e Encontro", descricao: "Jesus é encontrado no Templo.", virtude: "Devoção" }
  ],
  dolorosos: [
    { numero: 1, nome: "Agonia no Horto", descricao: "Jesus sofre no Horto.", virtude: "Contrição" },
    { numero: 2, nome: "Flagelação", descricao: "Jesus é flagelado.", virtude: "Pureza" },
    { numero: 3, nome: "Coroação de Espinhos", descricao: "Jesus é coroado de espinhos.", virtude: "Paciência" },
    { numero: 4, nome: "Caminho do Calvário", descricao: "Jesus carrega a cruz.", virtude: "Perseverança" },
    { numero: 5, nome: "Crucificação", descricao: "Jesus morre na cruz.", virtude: "Sacrifício" }
  ],
  gloriosos: [
    { numero: 1, nome: "Ressurreição", descricao: "Jesus ressuscita.", virtude: "Fé" },
    { numero: 2, nome: "Ascensão", descricao: "Jesus sobe aos céus.", virtude: "Esperança" },
    { numero: 3, nome: "Pentecostes", descricao: "O Espírito Santo desce.", virtude: "Amor" },
    { numero: 4, nome: "Assunção", descricao: "Maria é levada ao Céu.", virtude: "Devoção" },
    { numero: 5, nome: "Coroação de Maria", descricao: "Maria é coroada.", virtude: "Confiança" }
  ],
  luminosos: [
    { numero: 1, nome: "Batismo no Jordão", descricao: "Jesus é batizado por João Batista.", virtude: "Abertura ao Espírito Santo" },
    { numero: 2, nome: "Bodas de Caná", descricao: "Jesus transforma água em vinho.", virtude: "Fé" },
    { numero: 3, nome: "Anúncio do Reino", descricao: "Jesus proclama o Reino de Deus.", virtude: "Conversão" },
    { numero: 4, nome: "Transfiguração", descricao: "Jesus é transfigurado.", virtude: "Desejo de Deus" },
    { numero: 5, nome: "Instituição da Eucaristia", descricao: "Jesus institui a Eucaristia.", virtude: "Adoração" }
  ]
};

function getMisteriosDoDia() {
  const d = new Date().getDay();
  if (d === 1 || d === 6) return MISTERIOS.gozosos;
  if (d === 2 || d === 5) return MISTERIOS.dolorosos;
  if (d === 4) return MISTERIOS.luminosos;
  return MISTERIOS.gloriosos;
}

/* =========================
   PIN (corrigido)
   ========================= */
const PIN = {
  key: 'app_pin',
  defaultPin: '1234',

  getPin() {
    const saved = Storage.get(this.key, null);
    // se for null/undefined, retorna default
    return (typeof saved === 'string' && saved.length > 0) ? saved : this.defaultPin;
  },

  setPin(pin) {
    // aceita números ou strings, salva como string de 4 dígitos
    const s = String(pin).slice(0, 4);
    Storage.set(this.key, s);
    return true;
  },

  verify(pin) {
    try {
      return String(pin) === this.getPin();
    } catch (e) {
      console.error('PIN.verify error', e);
      return false;
    }
  },

  changePin(oldPin, newPin) {
    if (!this.verify(oldPin)) return false;
    this.setPin(newPin);
    return true;
  },

  resetPin() {
    this.setPin(this.defaultPin);
  }
};

/* =========================
   TERÇO (compatibilidade)
   ========================= */
const Terco = {
  getProgress(type) {
    return Storage.get(`terco_${type}`, { count: 0, completed: false, date: null });
  },

  saveProgress(type, data) {
    Storage.set(`terco_${type}`, data);
  },

  increment(type, max) {
    const p = Terco.getProgress(type);
    if (typeof p.count !== 'number') p.count = 0;
    if (p.count < max) p.count++;
    if (p.count >= max) {
      p.completed = true;
      p.date = new Date().toISOString();
      Terco.markTercoDay(type);
    }
    Terco.saveProgress(type, p);
    return p;
  },

  reset(type) {
    Terco.saveProgress(type, { count: 0, completed: false, date: null });
  },

  // calendar functions used by exportData in your settings page
  getTercoCalendar() {
    return Storage.get('terco_calendar', {});
  },

  markTercoDay(type) {
    const today = getTodayDate();
    const cal = Storage.get('terco_calendar', {});
    if (!cal[today]) cal[today] = [];
    if (!cal[today].includes(type)) cal[today].push(type);
    Storage.set('terco_calendar', cal);
  }
};

/* =========================
   ANOTAÇÕES (compatibilidade)
   ========================= */
const Anotacoes = {
  getAnotacoes() {
    return Storage.get('anotacoes_data', []);
  },

  get: () => Anotacoes.getAnotacoes(), // alias

  save(list) {
    Storage.set('anotacoes_data', list);
  },

  add(titulo, conteudo) {
    const arr = Anotacoes.getAnotacoes();
    const item = { id: Date.now(), titulo: titulo || 'Sem título', conteudo: conteudo || '', date: new Date().toISOString() };
    arr.push(item);
    Anotacoes.save(arr);
    return item;
  },

  delete(id) {
    const arr = Anotacoes.getAnotacoes().filter(a => a.id !== id);
    Anotacoes.save(arr);
  },

  update(id, titulo, conteudo) {
    const arr = Anotacoes.getAnotacoes();
    const item = arr.find(x => x.id === id);
    if (!item) return false;
    item.titulo = titulo || item.titulo;
    item.conteudo = conteudo || item.conteudo;
    Anotacoes.save(arr);
    return true;
  }
};

/* =========================
   CONFISSÃO (compatibilidade)
   ========================= */
const Confissao = {
  saveConfissao(conf) {
    const arr = Storage.get('confissao_data', []);
    arr.push({ id: Date.now(), data: new Date().toISOString(), ...conf });
    Storage.set('confissao_data', arr);
  },

  getConfissoes() {
    return Storage.get('confissao_data', []);
  },

  getConfessions: () => Confissao.getConfissoes(), // alias
  getConfissoesAlias: () => Confissao.getConfissoes() // extra alias used somewhere
};

/* =========================
   LECTIO DIVINA (compatibilidade)
   ========================= */
const LectioDivina = {
  get() {
    return Storage.get('lectio_data', { leitura: '', meditacao: '', oracao: '', contemplacao: '' });
  },

  save(data) {
    Storage.set('lectio_data', data);
  }
};

/* =========================
   API – LITURGIA (via proxy.php ou fallback)
   ========================= */
async function getLiturgia(day, month, year) {
  try {
    // usa proxy.php como proposto
    const raw = `https://liturgia.acolitos.com.br/api/liturgia?dia=${day}&mes=${month}&ano=${year}`;
    const url = `proxy.php?url=${encodeURIComponent(raw)}`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Bad response from proxy');

    const data = await resp.json();
    // retorno robusto
    return {
      titulo: data.titulo || "Liturgia do Dia",
      leituras: data.leituras || data.leituras_plain || "(indisponível)",
      evangelho: data.evangelho || data.evangelho_plain || "(indisponível)"
    };
  } catch (e) {
    console.warn('getLiturgia fallback', e);
    return {
      titulo: "Liturgia Offline",
      leituras: "(offline) Leia um trecho bíblico salvo.",
      evangelho: "(offline) Evangelho não disponível."
    };
  }
}

/* =========================
   DEBUG / Inicialização
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  console.log('app.js carregado — Storage e PIN prontos.');
  // Garantir que o PIN padrão esteja salvo (opcional)
  // só inicializa se não existir ainda
  const existing = Storage.get('app_pin', null);
  if (!existing) {
    // não sobrescreve se já existir algo (por segurança)
    Storage.set('app_pin', '1234');
  }
});