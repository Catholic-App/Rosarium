// app.js

/* ============================================
   ROSARIUM - APP.JS VERSÃO CORRIGIDA
   Lógica completa do aplicativo
   ============================================ */

// ============================================
// ORAÇÕES OFICIAIS COMPLETAS (Fontes Católicas)
// ============================================

const ORACOES = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  
  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, e está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  
  pai_nosso: "Pai nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  
  ave_maria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",
  
  gloria_ao_pai: "Glória seja ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.",
  
  o_meu_jesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas ao céu, especialmente as que mais precisarem da vossa misericórdia. Amém.",
  
  eterno_pai: "Eterno Pai, ofereço-vos o Corpo e o Sangue, a Alma e a Divindade de Nosso Senhor Jesus Cristo, em reparação dos nossos pecados e pelos do mundo inteiro.",
  
  pela_sua_dolorosa_paixao: "Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",
  
  santo_deus: "Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.",
  
  o_sangue_e_agua: "Ó Sangue e Água, que brotastes do Coração de Jesus como fonte de misericórdia para nós, confio em Vós. Amém."
};

// ============================================
// FRASES DE SANTOS
// ============================================

const SAINT_QUOTES = [
  { quote: "Não tenhas medo. A partir de agora serás pescador de homens.", saint: "Jesus Cristo (Lucas 5:10)" },
  { quote: "Tudo posso naquele que me fortalece.", saint: "São Paulo (Filipenses 4:13)" },
  { quote: "Reze, espere e não se preocupe.", saint: "São Padre Pio" },
  { quote: "Deus não exige de nós que tenhamos sucesso, mas que sejamos fiéis.", saint: "Madre Teresa de Calcutá" },
  { quote: "A oração é a chave da manhã e o ferrolho da noite.", saint: "Santo Agostinho" },
  { quote: "Quem canta, ora duas vezes.", saint: "Santo Agostinho" },
  { quote: "Deus escreve certo por linhas tortas.", saint: "Provérbio Popular" },
  { quote: "Confia sempre na misericórdia de Deus.", saint: "Santa Faustina" },
  { quote: "O Rosário é a arma mais poderosa.", saint: "São Padre Pio" },
  { quote: "Não se turbe o vosso coração.", saint: "Jesus Cristo (João 14:1)" }
];

// ============================================
// MISTÉRIOS DO ROSÁRIO
// ============================================

const MISTERIOS = {
  gozosos: [
    { numero: 1, nome: "Anunciação", descricao: "O Anjo Gabriel anuncia à Virgem Maria que será a Mãe de Deus.", virtude: "Humildade" },
    { numero: 2, nome: "Visita a Isabel", descricao: "Maria visita sua prima Isabel e a saúda com alegria.", virtude: "Caridade" },
    { numero: 3, nome: "Nascimento de Jesus", descricao: "Jesus nasce em Belém e é colocado numa manjedoura.", virtude: "Pobreza" },
    { numero: 4, nome: "Apresentação no Templo", descricao: "Jesus é apresentado no Templo e reconhecido como Messias.", virtude: "Obediência" },
    { numero: 5, nome: "Encontro no Templo", descricao: "Jesus é encontrado no Templo entre os doutores da Lei.", virtude: "Devoção" }
  ],
  dolorosos: [
    { numero: 1, nome: "Agonia no Horto", descricao: "Jesus reza no Horto das Oliveiras e sua alma fica triste até à morte.", virtude: "Contrição" },
    { numero: 2, nome: "Flagelação", descricao: "Jesus é flagelado e coberto de feridas por nossos pecados.", virtude: "Pureza" },
    { numero: 3, nome: "Coroação de Espinhos", descricao: "Jesus é coroado de espinhos e zombado pelos soldados.", virtude: "Paciência" },
    { numero: 4, nome: "Caminho do Calvário", descricao: "Jesus carrega a Cruz até o Calvário, caindo três vezes.", virtude: "Perseverança" },
    { numero: 5, nome: "Crucifixão", descricao: "Jesus é crucificado no Calvário e morre pela salvação do mundo.", virtude: "Sacrifício" }
  ],
  gloriosos: [
    { numero: 1, nome: "Ressurreição", descricao: "Jesus ressuscita glorioso no terceiro dia, vencendo a morte.", virtude: "Fé" },
    { numero: 2, nome: "Ascensão", descricao: "Jesus sobe aos céus e senta-se à direita de Deus Pai.", virtude: "Esperança" },
    { numero: 3, nome: "Pentecostes", descricao: "O Espírito Santo desce sobre os apóstolos em forma de línguas de fogo.", virtude: "Amor do Espírito Santo" },
    { numero: 4, nome: "Assunção", descricao: "Maria é assunta aos céus em corpo e alma.", virtude: "Devoção a Maria" },
    { numero: 5, nome: "Coroação de Maria", descricao: "Maria é coroada Rainha do Céu e da Terra.", virtude: "Confiança em Maria" }
  ],
  luminosos: [
    { numero: 1, nome: "Batismo no Jordão", descricao: "Jesus é batizado por João Batista e o Espírito Santo desce sobre Ele.", virtude: "Abertura ao Espírito Santo" },
    { numero: 2, nome: "Bodas de Caná", descricao: "Jesus realiza seu primeiro milagre, transformando água em vinho.", virtude: "Fé em Jesus" },
    { numero: 3, nome: "Anúncio do Reino", descricao: "Jesus proclama a chegada do Reino de Deus e convida à conversão.", virtude: "Conversão" },
    { numero: 4, nome: "Transfiguração", descricao: "Jesus é transfigurado no monte Tabor e sua divindade é revelada.", virtude: "Desejo de Deus" },
    { numero: 5, nome: "Eucaristia", descricao: "Jesus institui a Eucaristia como memorial de sua Paixão e Morte.", virtude: "Adoração" }
  ]
};

// ============================================
// SANTOS DO MÊS (Substituído pela lógica de carregamento JSON)
// ============================================

// A lista SANTOS estática foi removida e será substituída pela lógica de carregamento JSON.

// ============================================
// LIVROS DA BÍBLIA
// ============================================

const BIBLIA_LIVROS = [
  { nome: "Gênesis", abreviacao: "Gn", capitulos: 50 },
  { nome: "Êxodo", abreviacao: "Ex", capitulos: 40 },
  { nome: "Levítico", abreviacao: "Lv", capitulos: 27 },
  { nome: "Números", abreviacao: "Nm", capitulos: 36 },
  { nome: "Deuteronômio", abreviacao: "Dt", capitulos: 34 },
  { nome: "Josué", abreviacao: "Js", capitulos: 24 },
  { nome: "Juízes", abreviacao: "Jz", capitulos: 21 },
  { nome: "Rute", abreviacao: "Rt", capitulos: 4 },
  { nome: "1 Samuel", abreviacao: "1Sm", capitulos: 31 },
  { nome: "2 Samuel", abreviacao: "2Sm", capitulos: 24 },
  { nome: "1 Reis", abreviacao: "1Rs", capitulos: 22 },
  { nome: "2 Reis", abreviacao: "2Rs", capitulos: 25 },
  { nome: "1 Crônicas", abreviacao: "1Cr", capitulos: 29 },
  { nome: "2 Crônicas", abreviacao: "2Cr", capitulos: 36 },
  { nome: "Esdras", abreviacao: "Esd", capitulos: 10 },
  { nome: "Neemias", abreviacao: "Ne", capitulos: 13 },
  { nome: "Tobias", abreviacao: "Tb", capitulos: 14 },
  { nome: "Judite", abreviacao: "Jdt", capitulos: 16 },
  { nome: "Ester", abreviacao: "Est", capitulos: 10 },
  { nome: "1 Macabeus", abreviacao: "1Mc", capitulos: 16 },
  { nome: "2 Macabeus", abreviacao: "2Mc", capitulos: 15 },
  { nome: "Jó", abreviacao: "Jó", capitulos: 42 },
  { nome: "Salmos", abreviacao: "Sl", capitulos: 150 },
  { nome: "Provérbios", abreviacao: "Pr", capitulos: 31 },
  { nome: "Eclesiastes", abreviacao: "Ec", capitulos: 12 },
  { nome: "Cântico dos Cânticos", abreviacao: "Ct", capitulos: 8 },
  { nome: "Sabedoria", abreviacao: "Sb", capitulos: 19 },
  { nome: "Eclesiástico", abreviacao: "Eclo", capitulos: 51 },
  { nome: "Isaías", abreviacao: "Is", capitulos: 66 },
  { nome: "Jeremias", abreviacao: "Jr", capitulos: 52 },
  { nome: "Lamentações", abreviacao: "Lm", capitulos: 5 },
  { nome: "Baruc", abreviacao: "Br", capitulos: 6 },
  { nome: "Ezequiel", abreviacao: "Ez", capitulos: 48 },
  { nome: "Daniel", abreviacao: "Dn", capitulos: 14 },
  { nome: "Oséias", abreviacao: "Os", capitulos: 14 },
  { nome: "Joel", abreviacao: "Jl", capitulos: 3 },
  { nome: "Amós", abreviacao: "Am", capitulos: 9 },
  { nome: "Abdias", abreviacao: "Abd", capitulos: 1 },
  { nome: "Jonas", abreviacao: "Jn", capitulos: 4 },
  { nome: "Miquéias", abreviacao: "Mq", capitulos: 7 },
  { nome: "Naum", abreviacao: "Na", capitulos: 3 },
  { nome: "Habacuc", abreviacao: "Hab", capitulos: 3 },
  { nome: "Sofonias", abreviacao: "Sf", capitulos: 3 },
  { nome: "Ageu", abreviacao: "Ag", capitulos: 2 },
  { nome: "Zacarias", abreviacao: "Zc", capitulos: 14 },
  { nome: "Malaquias", abreviacao: "Ml", capitulos: 4 },
  { nome: "Mateus", abreviacao: "Mt", capitulos: 28 },
  { nome: "Marcos", abreviacao: "Mc", capitulos: 16 },
  { nome: "Lucas", abreviacao: "Lc", capitulos: 24 },
  { nome: "João", abreviacao: "Jo", capitulos: 21 },
  { nome: "Atos dos Apóstolos", abreviacao: "At", capitulos: 28 },
  { nome: "Romanos", abreviacao: "Rm", capitulos: 16 },
  { nome: "1 Coríntios", abreviacao: "1Cor", capitulos: 16 },
  { nome: "2 Coríntios", abreviacao: "2Cor", capitulos: 13 },
  { nome: "Gálatas", abreviacao: "Gl", capitulos: 6 },
  { nome: "Efésios", abreviacao: "Ef", capitulos: 6 },
  { nome: "Filipenses", abreviacao: "Fl", capitulos: 4 },
  { nome: "Colossenses", abreviacao: "Cl", capitulos: 4 },
  { nome: "1 Tessalonicenses", abreviacao: "1Ts", capitulos: 5 },
  { nome: "2 Tessalonicenses", abreviacao: "2Ts", capitulos: 3 },
  { nome: "1 Timóteo", abreviacao: "1Tm", capitulos: 6 },
  { nome: "2 Timóteo", abreviacao: "2Tm", capitulos: 4 },
  { nome: "Tito", abreviacao: "Tt", capitulos: 3 },
  { nome: "Filemom", abreviacao: "Fm", capitulos: 1 },
  { nome: "Hebreus", abreviacao: "Hb", capitulos: 13 },
  { nome: "Tiago", abreviacao: "Tg", capitulos: 5 },
  { nome: "1 Pedro", abreviacao: "1Pd", capitulos: 5 },
  { nome: "2 Pedro", abreviacao: "2Pd", capitulos: 3 },
  { nome: "1 João", abreviacao: "1Jo", capitulos: 5 },
  { nome: "2 João", abreviacao: "2Jo", capitulos: 1 },
  { nome: "3 João", abreviacao: "3Jo", capitulos: 1 },
  { nome: "Judas", abreviacao: "Jd", capitulos: 1 },
  { nome: "Apocalipse", abreviacao: "Ap", capitulos: 22 }
];

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function getRandomQuote() {
  return SAINT_QUOTES[Math.floor(Math.random() * SAINT_QUOTES.length)];
}

function goBack() {
  window.history.back();
}

function navigateTo(page) {
  window.location.href = page;
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getMisteriosDoDia() {
  const dia = new Date().getDay();
  switch(dia) {
    case 0: case 3: return MISTERIOS.gloriosos;
    case 1: case 6: return MISTERIOS.gozosos;
    case 2: case 5: return MISTERIOS.dolorosos;
    case 4: return MISTERIOS.luminosos;
    default: return MISTERIOS.gloriosos;
  }
}

function getNomeMisterios() {
  const dia = new Date().getDay();
  switch(dia) {
    case 0: case 3: return "Mistérios Gloriosos";
    case 1: case 6: return "Mistérios Gozosos";
    case 2: case 5: return "Mistérios Dolorosos";
    case 4: return "Mistérios Luminosos";
    default: return "Mistérios Gloriosos";
  }
}

// A função getSantoDoDia() estática foi removida e será substituída pela lógica de carregamento JSON.

// ============================================
// LÓGICA DE DADOS SANTOS (NOVA)
// ============================================

const SantoDoDia = {
    data: {
        santosOficiais: {},
        santosExtra: {},
        indexSantos: {},
        imgs: {}
    },
    
    // Função para carregar todos os arquivos JSON
    async loadData() {
        const files = [
            { name: 'santosOficiais', url: 'santos_oficiais.json' },
            { name: 'santosExtra', url: 'santos_extra.json' },
            { name: 'indexSantos', url: 'index_santos.json' },
            { name: 'imgs', url: 'imgs.json' }
        ];

        const promises = files.map(file => 
            fetch(file.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro ao carregar ${file.url}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    this.data[file.name] = json;
                    console.log(`${file.name} carregado com sucesso.`);
                })
                .catch(error => {
                    console.error(error);
                    // Em caso de erro, inicializa com objeto vazio para evitar quebrar
                    this.data[file.name] = {};
                })
        );

        await Promise.all(promises);
        console.log("Todos os dados carregados.");
    },

    // Função auxiliar para obter a data atual no formato MM-DD
    getCurrentDateKey() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    },

    // Função para obter o santo principal do dia
    getSantoDoDia() {
        const dateKey = this.getCurrentDateKey();
        const santosDoDia = this.getSantosDoDia(dateKey);
        
        if (santosDoDia.length > 0) {
            // Prioriza o primeiro santo oficial, se houver
            const oficial = santosDoDia.find(s => s.origem === 'oficial');
            if (oficial) {
                return oficial;
            }
            // Caso contrário, retorna o primeiro da lista (que pode ser extra)
            return santosDoDia[0];
        }

        // Retorno padrão caso não encontre nenhum santo
        return {
            nome: "Nenhum Santo Encontrado",
            biografia: "Verifique se os arquivos JSON foram carregados corretamente.",
            oracao: "Oração não disponível.",
            imagem: "",
            origem: "erro"
        };
    },

    // Função para obter todos os santos de um dia específico
    getSantosDoDia(dateKey) {
        const santos = [];
        
        // 1. Santos Oficiais
        if (this.data.santosOficiais[dateKey]) {
            this.data.santosOficiais[dateKey].forEach(s => {
                santos.push({ ...s, origem: 'oficial' });
            });
        }

        // 2. Santos Extras (evitando duplicatas pelo nome)
        const nomesOficiais = santos.map(s => s.nome);
        if (this.data.santosExtra[dateKey]) {
            this.data.santosExtra[dateKey].forEach(s => {
                if (!nomesOficiais.includes(s.nome)) {
                    santos.push({ ...s, origem: 'extra' });
                }
            });
        }
        
        // Adicionar informações de imagem
        santos.forEach(s => {
            const imgInfo = this.data.imgs[s.nome];
            if (imgInfo && imgInfo.arquivo) {
                s.imagem = imgInfo.arquivo;
            }
        });

        return santos;
    },

    // Função para obter os santos do mês atual
    getSantosDoMes() {
        const dateKey = this.getCurrentDateKey();
        const currentMonth = dateKey.substring(0, 2);
        const santosDoMes = [];

        // Itera sobre o index_santos para encontrar todos os dias do mês
        for (const key in this.data.indexSantos) {
            if (key.startsWith(currentMonth)) {
                const day = parseInt(key.substring(3, 5));
                const saintNames = this.data.indexSantos[key];
                
                // Para simplificar a lista do mês, pegamos apenas o primeiro santo de cada dia
                if (saintNames.length > 0) {
                    // Tentativa de obter o santo principal (o primeiro nome)
                    const principalName = saintNames[0];
                    
                    // Busca o santo completo nos arquivos oficiais ou extra
                    let santoCompleto = null;
                    
                    // Prioriza o oficial
                    if (this.data.santosOficiais[key]) {
                        santoCompleto = this.data.santosOficiais[key].find(s => s.nome === principalName);
                    }
                    
                    // Se não encontrou no oficial, busca no extra
                    if (!santoCompleto && this.data.santosExtra[key]) {
                        santoCompleto = this.data.santosExtra[key].find(s => s.nome === principalName);
                    }
                    
                    // Se encontrou, adiciona à lista
                    if (santoCompleto) {
                        santosDoMes.push({
                            dia: day,
                            nome: santoCompleto.nome,
                            oracao: santoCompleto.oracao || "Oração não disponível."
                        });
                    } else {
                        // Fallback se o nome estiver no index mas não nos arquivos de detalhe
                        santosDoMes.push({
                            dia: day,
                            nome: principalName,
                            oracao: "Detalhes não encontrados."
                        });
                    }
                }
            }
        }
        
        // Ordena por dia
        santosDoMes.sort((a, b) => a.dia - b.dia);
        
        return santosDoMes;
    }
};

// ============================================
// LOCALSTORAGE
// ============================================

const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Erro ao salvar:', e);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Erro ao ler:', e);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erro ao remover:', e);
      return false;
    }
  }
};

// ============================================
// PIN
// ============================================

const PIN = {
  defaultPin: '1234',

  getPin: () => Storage.get('app_pin', PIN.defaultPin),

  setPin: (pin) => Storage.set('app_pin', pin),

  verify: (pin) => pin === PIN.getPin(),

  changePin: (oldPin, newPin) => {
    if (PIN.verify(oldPin)) {
      PIN.setPin(newPin);
      return true;
    }
    return false;
  },

  resetPin: () => PIN.setPin(PIN.defaultPin)
};

// ============================================
// TERÇO
// ============================================

const Terco = {
  getTercoProgress: (type) => {
    return Storage.get(`terco_${type}`, { count: 0, date: null, completed: false });
  },

  saveTercoProgress: (type, progress) => {
    Storage.set(`terco_${type}`, progress);
  },

  incrementTerco: (type) => {
    const progress = Terco.getTercoProgress(type);
    const maxCount = type === 'mariano' ? 53 : 50;
    
    if (progress.count < maxCount) {
      progress.count++;
      progress.date = new Date().toISOString();
      
      if (progress.count === maxCount) {
        progress.completed = true;
        Terco.markTercoDay(type);
      }
      
      Terco.saveTercoProgress(type, progress);
    }
    return progress;
  },

  resetTerco: (type) => {
    Terco.saveTercoProgress(type, { count: 0, date: null, completed: false });
  },

  markTercoDay: (type) => {
    const today = getTodayDate();
    const calendar = Storage.get('terco_calendar', {});
    
    if (!calendar[today]) calendar[today] = [];
    if (!calendar[today].includes(type)) calendar[today].push(type);
    
    Storage.set('terco_calendar', calendar);
  },

  getTercoCalendar: () => Storage.get('terco_calendar', {}),

  isTercoDayMarked: (type, date) => {
    const calendar = Terco.getTercoCalendar();
    return calendar[date] && calendar[date].includes(type);
  }
};

// ============================================
// ANOTAÇÕES
// ============================================

const Anotacoes = {
  getAnotacoes: () => {
    const data = Storage.get('anotacoes_data', []);
    return Array.isArray(data) ? data : [];
  },

  saveAnotacoes: (anotacoes) => {
    Storage.set('anotacoes_data', anotacoes);
  },

  addAnotacao: (titulo, conteudo) => {
    const anotacoes = Anotacoes.getAnotacoes();
    anotacoes.push({
      id: Date.now(),
      titulo: titulo || 'Sem título',
      conteudo: conteudo || '',
      data: new Date().toISOString()
    });
    Anotacoes.saveAnotacoes(anotacoes);
    return anotacoes[anotacoes.length - 1];
  },

  deleteAnotacao: (id) => {
    let anotacoes = Anotacoes.getAnotacoes();
    anotacoes = anotacoes.filter(a => a.id !== id);
    Anotacoes.saveAnotacoes(anotacoes);
  },

  updateAnotacao: (id, titulo, conteudo) => {
    const anotacoes = Anotacoes.getAnotacoes();
    const anotacao = anotacoes.find(a => a.id === id);
    
    if (anotacao) {
      anotacao.titulo = titulo || 'Sem título';
      anotacao.conteudo = conteudo || '';
      Anotacoes.saveAnotacoes(anotacoes);
      return true;
    }
    return false;
  }
};

// ============================================
// CONFISSÃO
// ============================================

const Confissao = {
  getConfissoes: () => {
    const data = Storage.get('confissao_data', []);
    return Array.isArray(data) ? data : [];
  },

  saveConfissao: (confissao) => {
    const confissoes = Confissao.getConfissoes();
    confissoes.push({
      id: Date.now(),
      data: new Date().toISOString(),
      ...confissao
    });
    Storage.set('confissao_data', confissoes);
  }
};

// ============================================
// LECTIO DIVINA
// ============================================

const LectioDivina = {
  getLectio: () => Storage.get('lectio_data', { leitura: '', meditacao: '', oracao: '', contemplacao: '' }),

  saveLectio: (lectio) => Storage.set('lectio_data', lectio)
};

// ============================================
// APIS
// ============================================

async function getLiturgia(day, month, year) {
  try {
    const response = await fetch(`https://liturgia.acolitos.com.br/api/liturgia?dia=${day}&mes=${month}&ano=${year}`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return {
      titulo: data.titulo || 'Liturgia do Dia',
      leituras: data.leituras || 'Não disponível',
      evangelho: data.evangelho || ''
    };
  } catch (error) {
    console.error('Erro ao carregar liturgia:', error);
    return {
      titulo: 'Liturgia do Dia',
      leituras: 'Conexão indisponível. Verifique sua internet.',
      evangelho: ''
    };
  }
}

// ============================================
// EXPORTAÇÃO E INICIALIZAÇÃO
// ============================================

const App = {
    ORACOES,
    SAINT_QUOTES,
    MISTERIOS,
    BIBLIA_LIVROS,
    Storage,
    PIN,
    Terco,
    Anotacoes,
    Confissao,
    LectioDivina,
    getLiturgia,
    getRandomQuote,
    goBack,
    navigateTo,
    formatDate,
    getTodayDate,
    getMisteriosDoDia,
    getNomeMisterios,
    SantoDoDia // A nova lógica de santos
};

// Exporta o objeto App para ser acessível no escopo global do HTML
window.App = App;

// A inicialização do DOMContentLoaded no final do arquivo original foi removida,
// pois a inicialização da página de Santo do Dia será feita no script inline do HTML.
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('Rosarium carregado com sucesso');
// });
