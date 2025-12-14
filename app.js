/* ============================================================
  app.js — versão compatível, não-invasiva
  - preserva Terço original / calendário
  - PIN robusto (setPin, resetPin, verify)
  - Anotações: mantém nomes antigos e novos (compatibilidade)
  - Confissão: get/save
  - goBack presente
============================================================ */

/* ---------------- Storage ---------------- */
const Storage = {
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { console.error('Storage.set error', e); return false; }
  },
  get(key, def = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : def;
    } catch (e) {
      console.error('Storage.get error', e);
      return def;
    }
  },
  remove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (e) { console.error('Storage.remove error', e); return false; }
  }
};

/* ---------------- PIN (robusto e compatível) ----------------
   Expondo métodos: setPin, resetPin, verify, getPin (se necessário)
*/
const PIN = {
  key: 'user_pin',            // mantém key compatível
  defaultPin: '1234',

  getPin() {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return String(this.defaultPin);
      try { return String(JSON.parse(raw)); }
      catch { return String(raw); }
    } catch (e) {
      console.warn('PIN.getPin parse error', e);
      const raw = localStorage.getItem(this.key);
      return raw ? String(raw) : String(this.defaultPin);
    }
  },

  setPin(pin) {
    const s = String(pin).replace(/\D/g, '').slice(0,4).padStart(4,'0');
    try { localStorage.setItem(this.key, JSON.stringify(s)); }
    catch (e) { console.error('PIN.setPin error', e); }
  },

  resetPin() { this.setPin(this.defaultPin); },

  verify(input) {
    if (input === undefined || input === null) return false;
    return String(input) === this.getPin();
  }
};
window.PIN = PIN;

/* -------------- Anotações (compatibilidade máxima) --------------
   Fornece:
     - Anotacoes.getAll(), add(), update(), delete()
     - aliases usados antes: getAnotacoes(), addAnotacao(), updateAnotacao(), deleteAnotacao()
*/
const Anotacoes = {
  key: 'anotacoes_data',

  getAll() { return Storage.get(this.key, []); },

  add(titulo, conteudo, origem = 'Manual') {
    const arr = this.getAll();
    const item = { id: Date.now(), titulo: titulo || '', conteudo: conteudo || '', data: new Date().toISOString(), origem: origem };
    arr.push(item);
    Storage.set(this.key, arr);
    return item;
  },
  
  // Nova função para salvar anotações de outras fontes
  saveAnotacaoFromSource(titulo, conteudo, origem) {
      if (!conteudo || conteudo.trim() === '') return false;
      return this.add(titulo, conteudo, origem);
  },

  update(id, titulo, conteudo) {
    const arr = this.getAll();
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return false;
    arr[idx].titulo = titulo;
    arr[idx].conteudo = conteudo;
    arr[idx].data = new Date().toISOString();
    // Preserva a origem se existir
    // arr[idx].origem = arr[idx].origem || 'Manual'; 
    Storage.set(this.key, arr);
    return true;
  },

  delete(id) {
    const arr = this.getAll().filter(x => x.id !== id);
    Storage.set(this.key, arr);
  }
};
// Backwards-compatible aliases (para seu HTML antigo)
Anotacoes.getAnotacoes = Anotacoes.getAll.bind(Anotacoes);
Anotacoes.addAnotacao = function(t,c){ return Anotacoes.add(t,c); };
Anotacoes.updateAnotacao = function(id,t,c){ return Anotacoes.update(id,t,c); };
Anotacoes.deleteAnotacao = function(id){ return Anotacoes.delete(id); };
window.Anotacoes = Anotacoes;

/* -------------- Confissão (compatível) -------------- */
const Confissao = {
  key: 'confissoes_data',

  getConfissoes() { return Storage.get(this.key, []); },

  saveConfissao(obj) {
    const arr = this.getConfissoes();
    const item = { id: Date.now(), data: new Date().toISOString(), pecados: obj.pecados || [], notas: obj.notas || '' };
    arr.push(item);
    Storage.set(this.key, arr);
    
    // NOVO: Salvar anotações pessoais na área de Anotações
    if (obj.notas && obj.notas.trim() !== '') {
        const titulo = `Confissão - ${new Date(item.data).toLocaleDateString('pt-BR')}`;
        Anotacoes.saveAnotacaoFromSource(titulo, obj.notas, 'Confissão');
    }
    
    return item;
  }
};
window.Confissao = Confissao;

/* -------------- TERÇO / CALENDÁRIO (restauro compatível) --------------
   Mantive a versão rica com migração/legacy sync — não altera visuals.
*/
const TERCO_STORAGE_KEY = 'terco_calendar_v3';
const LEGACY_KEY = 'rosarium_calendar';

const Terco = {
  allowedTypes: ['mariano','misericordia','rosario','sao_jose'],

  _toISODate(d) {
    if (!d) {
      const now = new Date();
      return now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    }
    if (typeof d === 'string') return d.split('T')[0];
    const dt = new Date(d);
    return dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0');
  },

  getTercoCalendar() { return Storage.get(TERCO_STORAGE_KEY, {}); },

  saveTercoCalendar(obj) {
    const ok = Storage.set(TERCO_STORAGE_KEY, obj);
    if (ok) Terco.syncToLegacy(obj);
    return ok;
  },

  record(type, date) {
    if (!type || typeof type !== 'string') return false;
    type = String(type).toLowerCase();
    if (Terco.allowedTypes.indexOf(type) === -1) return false;
    const day = Terco._toISODate(date);
    const cal = Terco.getTercoCalendar();
    if (!cal[day]) cal[day] = { total: 0, tipos: [] };
    cal[day].total = (cal[day].total || 0) + 1;
    cal[day].tipos = cal[day].tipos || [];
    cal[day].tipos.push(type);
    Terco.saveTercoCalendar(cal);
    return true;
  },

  isDayMarked(date) {
    const day = Terco._toISODate(date);
    const cal = Terco.getTercoCalendar();
    return !!(cal[day] && cal[day].total > 0);
  },

  friendlyName(type) {
    const m = { mariano:'Terço Mariano', misericordia:'Terço da Misericórdia', rosario:'Rosário', sao_jose:'Terço de São José' };
    return m[type] || type;
  },

  syncToLegacy(richObj) {
    try {
      const legacy = {};
      for (const dateKey of Object.keys(richObj || {})) {
        const entry = richObj[dateKey];
        if (Array.isArray(entry.tipos) && entry.tipos.length) legacy[dateKey] = entry.tipos.slice();
        else {
          const arr = [];
          for (let i=0;i<(entry.total||0);i++) arr.push('terco');
          legacy[dateKey] = arr;
        }
      }
      Storage.set(LEGACY_KEY, legacy);
    } catch (e) { console.warn('Terco.syncToLegacy error', e); }
  },

  migrateLegacyToRich() {
    try {
      const legacy = Storage.get(LEGACY_KEY, null);
      if (!legacy) return false;
      const rich = Storage.get(TERCO_STORAGE_KEY, null);
      if (rich && Object.keys(rich).length) return false;
      const out = {};
      for (const dateKey of Object.keys(legacy)) {
        const arr = Array.isArray(legacy[dateKey]) ? legacy[dateKey] : [];
        out[dateKey] = { total: arr.length, tipos: arr.map(x => typeof x==='string'?x:(x.tipo||'terco')) };
      }
      Storage.set(TERCO_STORAGE_KEY, out);
      return true;
    } catch (e) { console.warn('migrateLegacyToRich error', e); return false; }
  }
};

window.App = window.App || {};
window.App.Terco = Terco;
window.registrarTercoRezados = function(type, date){ return Terco.record(type, date); };

/* -------------- goBack (compatível) -------------- */
function goBack() {
  if (document.referrer && history.length > 1) history.back();
  else window.location.href = 'home.html';
}
window.goBack = goBack;

/* -------------- Initialization: migrate if needed -------------- */
document.addEventListener('DOMContentLoaded', () => {
  try {
    const rich = Storage.get(TERCO_STORAGE_KEY, null);
    const legacy = Storage.get(LEGACY_KEY, null);
    if ((!rich || Object.keys(rich).length===0) && legacy && Object.keys(legacy).length) {
      Terco.migrateLegacyToRich();
    } else if (rich && Object.keys(rich).length) {
      Terco.syncToLegacy(rich);
    } else {
      Storage.set(TERCO_STORAGE_KEY, Storage.get(TERCO_STORAGE_KEY, {}));
      Storage.set(LEGACY_KEY, Storage.get(LEGACY_KEY, {}));
    }

    // ensure data keys exist without overwriting content
    Storage.set('confissoes_data', Storage.get('confissoes_data', Storage.get('confissoes_data', [])));
    Storage.set('anotacoes_data', Storage.get('anotacoes_data', Storage.get('anotacoes_data', [])));
  } catch (e) { console.warn('init error', e); }
});
