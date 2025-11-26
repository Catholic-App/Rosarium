/* app.js - Terço + Calendário (Formato A: por dia, somando todos os terços do dia)
   Tipos suportados: "mariano", "rosario", "misericordia"
*/

(function () {
  const STORAGE_KEY_CALENDAR = 'terco_calendar_v2';

  // Storage simples com try/catch
  const Storage = {
    set: (k, v) => {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; }
      catch (e) { console.error('Storage.set error', e); return false; }
    },
    get: (k, def = null) => {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
      catch (e) { console.error('Storage.get error', e); return def; }
    },
    remove: (k) => {
      try { localStorage.removeItem(k); return true; }
      catch (e) { console.error('Storage.remove error', e); return false; }
    }
  };

  // Helpers de data
  function todayISO() {
    return new Date().toISOString().split('T')[0];
  }

  function toISODate(d) {
    if (!d) return null;
    if (typeof d === 'string') return d.split('T')[0];
    return new Date(d).toISOString().split('T')[0];
  }

  // Objeto Terco responsável por registrar no calendário
  const Terco = {
    allowedTypes: ['mariano', 'rosario', 'misericordia'],

    // retorna o objeto calendar: { "YYYY-MM-DD": { total: N, tipos: [ 'mariano', ...' ] } }
    getTercoCalendar() {
      return Storage.get(STORAGE_KEY_CALENDAR, {});
    },

    // registra um terço do tipo 'type' no dia 'date' (ISO string YYYY-MM-DD). se date omitido usa hoje
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

      const day = date ? toISODate(date) : todayISO();
      const calendar = Terco.getTercoCalendar();

      if (!calendar[day]) {
        calendar[day] = { total: 0, tipos: [] };
      }

      calendar[day].total = (calendar[day].total || 0) + 1;
      calendar[day].tipos = calendar[day].tipos || [];
      calendar[day].tipos.push(type);

      Storage.set(STORAGE_KEY_CALENDAR, calendar);
      return true;
    },

    // clear (apagar calendário completo)
    clearCalendar() {
      Storage.remove(STORAGE_KEY_CALENDAR);
    },

    // util: verificar se dia marcado
    isDayMarked(date) {
      const d = toISODate(date);
      const calendar = Terco.getTercoCalendar();
      return !!(calendar[d] && calendar[d].total > 0);
    },

    // retorna um rótulo legível para um tipo
    friendlyName(type) {
      if (!type) return type;
      const map = {
        mariano: 'Terço Mariano',
        rosario: 'Rosário',
        misericordia: 'Terço da Misericórdia'
      };
      return map[type] || type;
    }
  };

  // Expõe globalmente
  window.Terco = Terco;

  // Função global conveniente (usada pelos terços)
  window.registrarTercoRezados = function (type, date) {
    try {
      return Terco.record(type, date);
    } catch (e) {
      console.error('Erro registrarTercoRezados', e);
      return false;
    }
  };

  /* ------------------------------
     Calendar helpers
     ------------------------------ */
  const Calendar = {
    getMonthName: (m) => {
      const names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
      return names[m] || '';
    },

    getFirstDayOfMonth: (year, month) => {
      // retorna 0..6 (Dom..Sab)
      return new Date(year, month, 1).getDay();
    },

    getDaysInMonth: (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    }
  };

  window.App = window.App || {};
  window.App.Calendar = Calendar;
  window.App.Terco = Terco;

  // Export a small debug method to print calendar to console
  window.printTercoCalendar = function () {
    console.log('Terço calendar:', Terco.getTercoCalendar());
  };

})();