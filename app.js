/* app.js - Final e completo
   - Storage helper
   - PIN (simples)
   - Anotacoes (localStorage)
   - App.Terco (calendar registre por dia, tipos: mariano, misericordia, rosario)
   - App.Calendar helpers
   - registrarTercoRezados(type) global
*/

(function(){
  /* ---------------------------
     STORAGE
  --------------------------- */
  const Storage = {
    set: (key, val) => {
      try { localStorage.setItem(key, JSON.stringify(val)); return true; }
      catch (e) { console.error('Storage.set error', e); return false; }
    },
    get: (key, def = null) => {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : def;
      } catch (e) {
        console.error('Storage.get error', e);
        return def;
      }
    },
    remove: (key) => {
      try { localStorage.removeItem(key); return true; }
      catch (e) { console.error('Storage.remove error', e); return false; }
    }
  };

  /* ---------------------------
     PIN (simples)
  --------------------------- */
  const PIN = {
    key: 'app_pin',
    defaultPin: '1234',
    getPin() {
      const p = Storage.get(this.key, this.defaultPin) || this.defaultPin;
      return String(p).slice(0,4);
    },
    setPin(pin) {
      const s = String(pin).replace(/\D/g, '').slice(0,4);
      Storage.set(this.key, s);
    },
    verify(pin) {
      return String(pin) === this.getPin();
    }
  };
  window.PIN = PIN;

  /* ---------------------------
     Anotações (simples)
  --------------------------- */
  const Anotacoes = {
    key: 'anotacoes_data',
    getAnotacoes() {
      return Storage.get(this.key, []);
    },
    add(titulo, conteudo) {
      const arr = this.getAnotacoes();
      const item = { id: Date.now(), titulo: titulo||'Sem título', conteudo: conteudo||'', date: new Date().toISOString() };
      arr.push(item);
      Storage.set(this.key, arr);
      return item;
    },
    update(id, titulo, conteudo) {
      const arr = this.getAnotacoes();
      const idx = arr.findIndex(x => x.id === id);
      if (idx === -1) return false;
      arr[idx].titulo = titulo || arr[idx].titulo;
      arr[idx].conteudo = conteudo || arr[idx].conteudo;
      arr[idx].date = new Date().toISOString();
      Storage.set(this.key, arr);
      return true;
    },
    delete(id) {
      const arr = this.getAnotacoes().filter(a => a.id !== id);
      Storage.set(this.key, arr);
    }
  };
  window.Anotacoes = Anotacoes;

  /* ---------------------------
     App namespace
  --------------------------- */
  window.App = window.App || {};

  /* ---------------------------
     Calendar helpers
  --------------------------- */
  const Calendar = {
    getMonthName: (m) => {
      const names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
      return names[m] || '';
    },
    getFirstDayOfMonth: (year, month) => {
      // 0..6 (Dom..Sab)
      return new Date(year, month, 1).getDay();
    },
    getDaysInMonth: (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    }
  };
  window.App.Calendar = Calendar;

  /* ---------------------------
     Terço / Calendário (Formato A: por dia, somando)
  --------------------------- */
  const TERCO_STORAGE_KEY = 'terco_calendar_v3'; // versão para futuras mudanças

  const Terco = {
    allowedTypes: ['mariano', 'misericordia', 'rosario'],

    // retorna o calendário como objeto { "YYYY-MM-DD": { total: N, tipos: [...] } }
    getTercoCalendar() {
      return Storage.get(TERCO_STORAGE_KEY, {});
    },

    // grava o objeto inteiro
    saveTercoCalendar(obj) {
      return Storage.set(TERCO_STORAGE_KEY, obj);
    },

    // normalize date to YYYY-MM-DD
    _toISODate(d) {
      if (!d) return (new Date()).toISOString().split('T')[0];
      if (typeof d === 'string') return d.split('T')[0];
      return new Date(d).toISOString().split('T')[0];
    },

    // registra um terço do tipo 'type' no dia 'date' (ISO YYYY-MM-DD). date optional => today
    record(type, date) {
      if (!type || typeof type !== 'string') {
        console.warn('Terco.record: tipo inválido', type);
        return false;
      }
      type = String(type).toLowerCase();
      if (Terco.allowedTypes.indexOf(type) === -1) {
        console.warn('Terco.record: tipo não suportado', type);
        return false;
      }

      const day = Terco._toISODate(date);
      const calendar = Terco.getTercoCalendar();

      if (!calendar[day]) {
        calendar[day] = { total: 0, tipos: [] };
      }
      calendar[day].total = (calendar[day].total || 0) + 1;
      calendar[day].tipos = calendar[day].tipos || [];
      calendar[day].tipos.push(type);

      Terco.saveTercoCalendar(calendar);
      return true;
    },

    // remove calendário inteiro
    clearCalendar() {
      Storage.remove(TERCO_STORAGE_KEY);
    },

    // retorna se dia possui registros
    isDayMarked(date) {
      const day = Terco._toISODate(date);
      const cal = Terco.getTercoCalendar();
      return !!(cal[day] && cal[day].total > 0);
    },

    // util: friendly name
    friendlyName(type) {
      if (!type) return type;
      const m = {
        mariano: 'Terço Mariano',
        misericordia: 'Terço da Misericórdia',
        rosario: 'Rosário'
      };
      return m[type] || type;
    }
  };

  window.App.Terco = Terco;

  // alias global para ser chamado pelos terços
  window.registrarTercoRezados = function(type, date){
    try {
      return Terco.record(type, date);
    } catch (e) {
      console.error('registrarTercoRezados error', e);
      return false;
    }
  };

  /* ---------------------------
     Pequenos utilitários expostos globalmente
  --------------------------- */
  window.printTercoCalendar = function(){
    console.log('Terco calendar:', Terco.getTercoCalendar());
  };

  // pequena função de goBack (usada nos headers)
  function goBack() {
    if (document.referrer && history.length > 1) history.back();
    else window.location.href = 'home.html';
  }
  window.goBack = goBack;

  /* ---------------------------
     Inicialização mínima
     - garante chave padrão se não existir (não sobrescreve)
  --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // garante estrutura inicial (não substitui se já existir)
    try {
      if (!localStorage.getItem(TERCO_STORAGE_KEY)) {
        Storage.set(TERCO_STORAGE_KEY, {}); // vazio por padrão
      }
    } catch (e) {
      // ignore
    }
    // mantém retro-compatibilidade: se algum outro módulo espera App or Terco em window, já estão setados
    window.App = window.App || {};
    window.App.Terco = Terco;
    window.App.Calendar = window.App.Calendar || Calendar;
  });

})();