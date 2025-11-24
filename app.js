/* ============================================
   ROSARIUM - APP.JS VERSÃO FINAL COM PROXY
   ============================================ */

// ============================================
// ORAÇÕES OFICIAIS COMPLETAS
// ============================================

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

// ============================================
// FRASES DE SANTOS
// ============================================

const SAINT_QUOTES = [
  { quote: "Tudo posso naquele que me fortalece.", saint: "São Paulo" },
  { quote: "Reze, espere e não se preocupe.", saint: "São Padre Pio" },
  { quote: "Quem canta, ora duas vezes.", saint: "Santo Agostinho" }
];

// ============================================
// MISTÉRIOS DO ROSÁRIO
// ============================================

const MISTERIOS = {
  gozosos: [ /* ... */ ],
  dolorosos: [ /* ... */ ],
  gloriosos: [ /* ... */ ],
  luminosos: [ /* ... */ ]
};

// ============================================
// UTILITÁRIOS
// ============================================

function goBack() { history.back(); }

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getMisteriosDoDia() {
  const d = new Date().getDay();
  if (d === 0 || d === 3) return MISTERIOS.gloriosos;
  if (d === 1 || d === 6) return MISTERIOS.gozosos;
  if (d === 2 || d === 5) return MISTERIOS.dolorosos;
  return MISTERIOS.luminosos;
}

// ============================================
// LOCALSTORAGE
// ============================================

const Storage = {
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  get: (key, def = null) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : def;
  },
  remove: (key) => localStorage.removeItem(key)
};

// ============================================
// TERÇO
// ============================================

const Terco = {
  getProgress: (type) =>
    Storage.get(`terco_${type}`, { count: 0, completed: false }),

  saveProgress: (type, data) =>
    Storage.set(`terco_${type}`, data),

  increment: (type, max) => {
    const p = Terco.getProgress(type);
    if (p.count < max) p.count++;
    if (p.count >= max) p.completed = true;
    Terco.saveProgress(type, p);
    return p;
  },

  reset: (type) => {
    Storage.set(`terco_${type}`, { count: 0, completed: false });
  }
};

// ============================================
// ANOTAÇÕES
// ============================================

const Anotacoes = {
  get: () => Storage.get("anotacoes_data", []),
  save: (x) => Storage.set("anotacoes_data", x),

  add: (t, c) => {
    const arr = Anotacoes.get();
    const item = { id: Date.now(), titulo: t, conteudo: c, data: getTodayDate() };
    arr.push(item);
    Anotacoes.save(arr);
    return item;
  },

  delete: (id) => {
    const arr = Anotacoes.get().filter((a) => a.id !== id);
    Anotacoes.save(arr);
  }
};

// ============================================
// LECTIO DIVINA
// ============================================

const LectioDivina = {
  get: () => Storage.get("lectio_data", {}),
  save: (d) => Storage.set("lectio_data", d)
};

// ============================================
// API – LITURGIA (AGORA VIA PROXY.PHP)
// ============================================

async function getLiturgia(day, month, year) {
  try {
    const url =
      `proxy.php?url=https://liturgia.acolitos.com.br/api/liturgia?dia=${day}&mes=${month}&ano=${year}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("BAD RESPONSE");

    const data = await response.json();

    return {
      titulo: data.titulo || "Liturgia do Dia",
      leituras: data.leituras || "(indisponível)",
      evangelho: data.evangelho || "(indisponível)"
    };
  } catch (e) {
    console.error("Erro liturgia:", e);

    return {
      titulo: "Liturgia Offline",
      leituras: "(offline) Leia um trecho bíblico salvo.",
      evangelho: "(offline) Evangelho não disponível."
    };
  }
}

// ============================================
// DEBUG DE CARREGAMENTO
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Rosarium carregado com sucesso.");
});