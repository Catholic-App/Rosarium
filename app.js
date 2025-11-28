/* app.js - Consolidado e compatível
   - Storage helper
   - PIN (simples)
   - Anotacoes (localStorage)
   - App.Terco (calendar registre por dia, tipos: mariano, misericordia, rosario)
   - App.Calendar helpers
   - registrarTercoRezados(type) global (compatível com rosarium_calendar legacy)
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
     Terço / Calendário
     - primary storage: TERCO_STORAGE_KEY (rich format)
     - legacy compatibility: LEGACY_KEY (simple array format)
  --------------------------- */
  const TERCO_STORAGE_KEY = 'terco_calendar_v3'; // primary, object map date -> { total, tipos: [] }
  const LEGACY_KEY = 'rosarium_calendar';       // legacy, date -> [ 'mariano', ... ]

  const Terco = {
    allowedTypes: ['Mariano', 'Misericórdia', 'Rosário'],

    // retorna o calendário rico
    getTercoCalendar() {
      return Storage.get(TERCO_STORAGE_KEY, {});
    },

    // grava o objeto inteiro (rico)
    saveTercoCalendar(obj) {
      const ok = Storage.set(TERCO_STORAGE_KEY, obj);
      if (ok) {
        // manter legacy sincronizado
        Terco.syncToLegacy(obj);
      }
      return ok;
    },

    // normalize date to YYYY-MM-DD
    _toISODate(d) {
      if (!d) {
        const now = new Date();
        return now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
      }
      if (typeof d === 'string') {
        // accept YYYY-MM-DD or ISO-like; extract date part
        return d.split('T')[0];
      }
      const dt = new Date(d);
      return dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0');
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
      Storage.remove(LEGACY_KEY);
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
        Mariano: 'Terço Mariano',
        Misericórdia: 'Terço da Misericórdia',
        Rosário: 'Rosário'
      };
      return m[type] || type;
    },

    // Convert rich format -> legacy array format and write to LEGACY_KEY
    syncToLegacy(richObj) {
      try {
        const legacy = {};
        for (const dateKey of Object.keys(richObj || {})) {
          const entry = richObj[dateKey];
          // entry.tipos may be array of strings
          if (Array.isArray(entry.tipos) && entry.tipos.length) {
            legacy[dateKey] = entry.tipos.slice();
          } else {
            // fallback: push empty marker if total exists
            const arr = [];
            for (let i=0;i<(entry.total||0);i++) arr.push('terco');
            legacy[dateKey] = arr;
          }
        }
        Storage.set(LEGACY_KEY, legacy);
      } catch (e) {
        console.warn('Terco.syncToLegacy error', e);
      }
    },

    // Try to migrate legacy -> rich format (if primary missing)
    migrateLegacyToRich() {
      try {
        const legacy = Storage.get(LEGACY_KEY, null);
        if (!legacy) return false;
        const rich = Storage.get(TERCO_STORAGE_KEY, null);
        if (rich && Object.keys(rich).length) return false; // already have rich
        const out = {};
        for (const dateKey of Object.keys(legacy)) {
          const arr = Array.isArray(legacy[dateKey]) ? legacy[dateKey] : [];
          out[dateKey] = {
            total: arr.length,
            tipos: arr.map(x => (typeof x === 'string' ? x : (x.tipo || 'terco')))
          };
        }
        Storage.set(TERCO_STORAGE_KEY, out);
        return true;
      } catch (e) {
        console.warn('migrateLegacyToRich error', e);
        return false;
      }
    }
  };

  window.App.Terco = Terco;

  // alias global para ser chamado pelos terços (preserve for existing code)
  window.registrarTercoRezados = function(type, date){
    try {
      const ok = Terco.record(type, date);
      if (!ok) console.warn('registrarTercoRezados: registro falhou para', type);
      return ok;
    } catch (e) {
      console.error('registrarTercoRezados error', e);
      return false;
    }
  };

  /* ---------------------------
     Small utilities
  --------------------------- */
  window.printTercoCalendar = function(){
    console.log('Terco calendar (rich):', Terco.getTercoCalendar());
    console.log('Terco calendar (legacy):', Storage.get(LEGACY_KEY));
  };

  function goBack() {
    if (document.referrer && history.length > 1) history.back();
    else window.location.href = 'home.html';
  }
  window.goBack = goBack;

  /* ---------------------------
     Initialization: ensure storage keys & migration
  --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // If legacy exists but rich doesn't, migrate
      const rich = Storage.get(TERCO_STORAGE_KEY, null);
      const legacy = Storage.get(LEGACY_KEY, null);

      if ((!rich || Object.keys(rich).length === 0) && legacy && Object.keys(legacy).length) {
        // migrate legacy -> rich
        Terco.migrateLegacyToRich();
      } else if (rich && Object.keys(rich).length) {
        // ensure legacy synced as well
        Terco.syncToLegacy(rich);
      } else {
        // both empty => ensure keys exist
        Storage.set(TERCO_STORAGE_KEY, Storage.get(TERCO_STORAGE_KEY, {}));
        Storage.set(LEGACY_KEY, Storage.get(LEGACY_KEY, {}));
      }
    } catch (e) {
      console.warn('Initialization error', e);
    }
    // expose to App namespace
    window.App = window.App || {};
    window.App.Terco = Terco;
    window.App.Calendar = window.App.Calendar || Calendar;
  });

})();