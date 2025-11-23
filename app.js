/* ============================================
   ROSARIUM - APP.JS
   Lógica completa do aplicativo
   ============================================ */

// ============================================
// ORAÇÕES OFICIAIS E COMPLETAS
// ============================================

const ORACOES_COMPLETAS = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  
  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, e está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  
  pai_nosso: "Pai nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  
  ave_maria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",
  
  gloria_ao_pai: "Glória seja ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.",
  
  o_meu_jesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas ao céu, especialmente as que mais precisarem da vossa misericórdia. Amém.",
  
  eterno_pai: "Eterno Pai, ofereço-vos o Corpo e o Sangue, a Alma e a Divindade de Nosso Senhor Jesus Cristo, em reparação dos nossos pecados e pelos do mundo inteiro.",
  
  pela_sua_dolorosa_paixao: "Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",
  
  santo_deus: "Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.",
  
  o_sangue_e_agua: "Ó Sangue e Água, que brotastes do Coração de Jesus como fonte de misericórdia para nós, confio em Vós. Amém.",
  
  expiraste_jesus: "Expiraste, Jesus, mas o manancial da vida continuou a correr para nós pela graça do Espírito Santo. Senhor, aumenta em nós a fé, a esperança e a caridade, e faz-nos dignos de participar na abundância das tuas bênçãos.",
  
  magnificat: "A minha alma engrandece o Senhor, e o meu espírito se alegra em Deus meu Salvador, porque atentou na humildade da sua serva; pois eis que desde agora me chamarão bem-aventurada todas as gerações. Porque me fez coisas grandes o Poderoso; e santo é o seu nome. E a sua misericórdia é de geração em geração sobre aqueles que o temem. Mostrou força com o seu braço; dispersou os soberbos no pensamento do seu coração. Derrubou dos tronos os poderosos, e exaltou os humildes. Aos famintos encheu de bens, e aos ricos despediu vazios. Recebeu Israel, seu servo, lembrado da sua misericórdia (como tinha falado a nossos pais) a Abraão e à sua descendência para sempre. Glória seja ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém."
};

// ============================================
// MISTÉRIOS DO ROSÁRIO
// ============================================

const MISTERIOS_ROSARIO = {
  gozosos: [
    {
      numero: 1,
      nome: "Anunciação",
      descricao: "O Anjo Gabriel anuncia à Virgem Maria que será a Mãe de Deus.",
      virtude: "Humildade"
    },
    {
      numero: 2,
      nome: "Visita a Isabel",
      descricao: "Maria visita sua prima Isabel e a saúda com alegria.",
      virtude: "Caridade"
    },
    {
      numero: 3,
      nome: "Nascimento de Jesus",
      descricao: "Jesus nasce em Belém e é colocado numa manjedoura.",
      virtude: "Pobreza"
    },
    {
      numero: 4,
      nome: "Apresentação no Templo",
      descricao: "Jesus é apresentado no Templo e reconhecido como Messias.",
      virtude: "Obediência"
    },
    {
      numero: 5,
      nome: "Encontro no Templo",
      descricao: "Jesus é encontrado no Templo entre os doutores da Lei.",
      virtude: "Devoção"
    }
  ],
  
  dolorosos: [
    {
      numero: 1,
      nome: "Agonia no Horto",
      descricao: "Jesus reza no Horto das Oliveiras e sua alma fica triste até à morte.",
      virtude: "Contrição"
    },
    {
      numero: 2,
      nome: "Flagelação",
      descricao: "Jesus é flagelado e coberto de feridas por nossos pecados.",
      virtude: "Pureza"
    },
    {
      numero: 3,
      nome: "Coroação de Espinhos",
      descricao: "Jesus é coroado de espinhos e zombado pelos soldados.",
      virtude: "Paciência"
    },
    {
      numero: 4,
      nome: "Caminho do Calvário",
      descricao: "Jesus carrega a Cruz até o Calvário, caindo três vezes.",
      virtude: "Perseverança"
    },
    {
      numero: 5,
      nome: "Crucifixão",
      descricao: "Jesus é crucificado no Calvário e morre pela salvação do mundo.",
      virtude: "Sacrifício"
    }
  ],
  
  gloriosos: [
    {
      numero: 1,
      nome: "Ressurreição",
      descricao: "Jesus ressuscita glorioso no terceiro dia, vencendo a morte.",
      virtude: "Fé"
    },
    {
      numero: 2,
      nome: "Ascensão",
      descricao: "Jesus sobe aos céus e senta-se à direita de Deus Pai.",
      virtude: "Esperança"
    },
    {
      numero: 3,
      nome: "Pentecostes",
      descricao: "O Espírito Santo desce sobre os apóstolos em forma de línguas de fogo.",
      virtude: "Amor do Espírito Santo"
    },
    {
      numero: 4,
      nome: "Assunção",
      descricao: "Maria é assunta aos céus em corpo e alma.",
      virtude: "Devoção a Maria"
    },
    {
      numero: 5,
      nome: "Coroação de Maria",
      descricao: "Maria é coroada Rainha do Céu e da Terra.",
      virtude: "Confiança em Maria"
    }
  ],
  
  luminosos: [
    {
      numero: 1,
      nome: "Batismo no Jordão",
      descricao: "Jesus é batizado por João Batista e o Espírito Santo desce sobre Ele.",
      virtude: "Abertura ao Espírito Santo"
    },
    {
      numero: 2,
      nome: "Bodas de Caná",
      descricao: "Jesus realiza seu primeiro milagre, transformando água em vinho.",
      virtude: "Fé em Jesus"
    },
    {
      numero: 3,
      nome: "Anúncio do Reino",
      descricao: "Jesus proclama a chegada do Reino de Deus e convida à conversão.",
      virtude: "Conversão"
    },
    {
      numero: 4,
      nome: "Transfiguração",
      descricao: "Jesus é transfigurado no monte Tabor e sua divindade é revelada.",
      virtude: "Desejo de Deus"
    },
    {
      numero: 5,
      nome: "Eucaristia",
      descricao: "Jesus institui a Eucaristia como memorial de sua Paixão e Morte.",
      virtude: "Adoração"
    }
  ]
};

// ============================================
// FUNÇÃO PARA OBTER MISTÉRIOS DO DIA
// ============================================

function getMisteriosDoDia() {
  const hoje = new Date();
  const diaDaSemana = hoje.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  
  switch(diaDaSemana) {
    case 0: // Domingo
    case 3: // Quarta
      return MISTERIOS_ROSARIO.gloriosos;
    case 1: // Segunda
    case 6: // Sábado
      return MISTERIOS_ROSARIO.gozosos;
    case 2: // Terça
    case 5: // Sexta
      return MISTERIOS_ROSARIO.dolorosos;
    case 4: // Quinta
      return MISTERIOS_ROSARIO.luminosos;
    default:
      return MISTERIOS_ROSARIO.gloriosos;
  }
}

function getNomeMisterios() {
  const hoje = new Date();
  const diaDaSemana = hoje.getDay();
  
  switch(diaDaSemana) {
    case 0:
    case 3:
      return "Mistérios Gloriosos";
    case 1:
    case 6:
      return "Mistérios Gozosos";
    case 2:
    case 5:
      return "Mistérios Dolorosos";
    case 4:
      return "Mistérios Luminosos";
    default:
      return "Mistérios Gloriosos";
  }
}

// ============================================
// ESTRUTURA DO TERÇO MARIANO
// ============================================

const TERCO_MARIANO_ESTRUTURA = {
  // Sequência inicial
  sequencia_inicial: [
    { tipo: "sinal_da_cruz", texto: ORACOES_COMPLETAS.sinal_da_cruz },
    { tipo: "creio", texto: ORACOES_COMPLETAS.creio },
    { tipo: "pai_nosso", texto: ORACOES_COMPLETAS.pai_nosso },
    { tipo: "ave_maria_1", texto: ORACOES_COMPLETAS.ave_maria },
    { tipo: "ave_maria_2", texto: ORACOES_COMPLETAS.ave_maria },
    { tipo: "ave_maria_3", texto: ORACOES_COMPLETAS.ave_maria },
    { tipo: "gloria_ao_pai", texto: ORACOES_COMPLETAS.gloria_ao_pai }
  ],
  
  // Cada mistério contém
  mistério: {
    pai_nosso: ORACOES_COMPLETAS.pai_nosso,
    ave_maria: ORACOES_COMPLETAS.ave_maria, // Repetir 10x
    gloria_ao_pai: ORACOES_COMPLETAS.gloria_ao_pai,
    jaculatoria: ORACOES_COMPLETAS.o_meu_jesus
  }
};

// ============================================
// ESTRUTURA DO TERÇO DA MISERICÓRDIA
// ============================================

const TERCO_MISERICORDIA_ESTRUTURA = {
  sequencia_inicial: [
    { tipo: "sinal_da_cruz", texto: ORACOES_COMPLETAS.sinal_da_cruz },
    { tipo: "expiraste_jesus", texto: ORACOES_COMPLETAS.expiraste_jesus }
  ],
  
  dezena: {
    eterno_pai: ORACOES_COMPLETAS.eterno_pai,
    pela_sua_dolorosa_paixao: ORACOES_COMPLETAS.pela_sua_dolorosa_paixao // Repetir 10x
  },
  
  sequencia_final: [
    { tipo: "santo_deus_1", texto: ORACOES_COMPLETAS.santo_deus },
    { tipo: "santo_deus_2", texto: ORACOES_COMPLETAS.santo_deus },
    { tipo: "santo_deus_3", texto: ORACOES_COMPLETAS.santo_deus },
    { tipo: "o_sangue_e_agua", texto: ORACOES_COMPLETAS.o_sangue_e_agua }
  ]
};

// ============================================
// FRASES DE SANTOS
// ============================================

const SAINT_QUOTES = [
  {
    quote: "Não tenhas medo. A partir de agora serás pescador de homens.",
    saint: "Jesus Cristo (Lucas 5:10)"
  },
  {
    quote: "Tudo posso naquele que me fortalece.",
    saint: "São Paulo (Filipenses 4:13)"
  },
  {
    quote: "Reze, espere e não se preocupe.",
    saint: "São Padre Pio"
  },
  {
    quote: "Deus não exige de nós que tenhamos sucesso, mas que sejamos fiéis.",
    saint: "Madre Teresa de Calcutá"
  },
  {
    quote: "A oração é a chave da manhã e o ferrolho da noite.",
    saint: "Santo Agostinho"
  },
  {
    quote: "Quem canta, ora duas vezes.",
    saint: "Santo Agostinho"
  },
  {
    quote: "Deus escreve certo por linhas tortas.",
    saint: "Provérbio Popular"
  },
  {
    quote: "Confia sempre na misericórdia de Deus.",
    saint: "Santa Faustina"
  },
  {
    quote: "O Rosário é a arma mais poderosa.",
    saint: "São Padre Pio"
  },
  {
    quote: "Não se turbe o vosso coração.",
    saint: "Jesus Cristo (João 14:1)"
  },
  {
    quote: "Bem-aventurado quem crê sem ter visto.",
    saint: "Jesus Cristo (João 20:29)"
  },
  {
    quote: "Amai-vos uns aos outros como eu vos amei.",
    saint: "Jesus Cristo (João 13:34)"
  }
];

// ============================================
// DADOS DOS SANTOS
// ============================================

const SANTOS_DO_MES = [
  {
    dia: 1,
    nome: "Santo André",
    oração: "Santo André, apóstolo de Jesus, roga por nós.",
    biografia: "Santo André foi um dos primeiros apóstolos de Jesus. Irmão de São Pedro, foi pescador no mar da Galileia. Após conhecer Jesus, dedicou sua vida à pregação do Evangelho. Segundo a tradição, foi martirizado em Patras, Grécia, crucificado em uma cruz em forma de X, conhecida como Cruz de Santo André."
  },
  {
    dia: 2,
    nome: "Santa Cecília",
    oração: "Santa Cecília, padroeira dos músicos, roga por nós.",
    biografia: "Santa Cecília é a padroeira dos músicos e da música. Viveu nos primeiros séculos do cristianismo e é conhecida por sua devoção e fé inabalável. Segundo a tradição, foi martirizada por sua fé cristã. Sua festa é celebrada em 22 de novembro."
  },
  {
    dia: 3,
    nome: "São Francisco Xavier",
    oração: "São Francisco Xavier, apóstolo das Índias, roga por nós.",
    biografia: "São Francisco Xavier foi um missionário jesuíta que levou a fé cristã para a Ásia. Nasceu em Navarra, Espanha, e dedicou sua vida à evangelização. Viajou pela Índia, Japão e outras regiões da Ásia. É conhecido como o 'Apóstolo das Índias' e é padroeiro das missões."
  },
  {
    dia: 4,
    nome: "Santa Bárbara",
    oração: "Santa Bárbara, protetora contra raios, roga por nós.",
    biografia: "Santa Bárbara é uma mártir cristã venerada desde os primeiros séculos. Segundo a tradição, era filha de um pagão que a trancou em uma torre. Converteu-se ao cristianismo e foi martirizada por sua fé. É padroeira dos artilheiros e protetora contra raios e tempestades."
  },
  {
    dia: 5,
    nome: "Santo Estêvão",
    oração: "Santo Estêvão, primeiro mártir, roga por nós.",
    biografia: "Santo Estêvão foi o primeiro mártir cristão (protomártir). Era um homem cheio de fé e realizava grandes prodígios entre o povo. Foi acusado falsamente, julgado e condenado à morte por apedrejamento. Sua morte marcou o início da perseguição aos cristãos."
  },
  {
    dia: 6,
    nome: "São Nicolau",
    oração: "São Nicolau, protetor das crianças, roga por nós.",
    biografia: "São Nicolau foi um bispo cristão que viveu na Turquia nos séculos III e IV. Conhecido por sua generosidade e amor pelas crianças, é padroeiro de várias categorias. Sua vida inspirou a lenda do Papai Noel. É venerado em muitas partes do mundo."
  },
  {
    dia: 7,
    nome: "Santo Amaro",
    oração: "Santo Amaro, protetor dos navegantes, roga por nós.",
    biografia: "Santo Amaro é um santo português venerado como protetor dos navegantes. Viveu nos primeiros séculos do cristianismo e dedicou sua vida à pregação do Evangelho. É especialmente venerado entre os marinheiros e pescadores."
  },
  {
    dia: 8,
    nome: "Imaculada Conceição",
    oração: "Virgem Imaculada, Mãe de Deus, roga por nós.",
    biografia: "A Imaculada Conceição refere-se à concepção de Maria, mãe de Jesus, sem a mancha do pecado original. É um dogma da Igreja Católica que afirma que Maria foi preservada do pecado original desde o primeiro instante de sua concepção. É celebrada em 8 de dezembro."
  },
  {
    dia: 9,
    nome: "Santa Joana",
    oração: "Santa Joana, padroeira da França, roga por nós.",
    biografia: "Santa Joana d'Arc foi uma heroína francesa que liderou as forças militares francesas durante a Guerra dos Cem Anos. Afirmava receber mensagens de santos. Foi capturada, julgada e executada. É padroeira da França e um símbolo de coragem e fé."
  },
  {
    dia: 10,
    nome: "Nossa Senhora de Loreto",
    oração: "Nossa Senhora de Loreto, protetora dos viajantes, roga por nós.",
    biografia: "Nossa Senhora de Loreto é venerada como protetora dos viajantes e aviadores. O santuário de Loreto, na Itália, é um dos mais importantes centros de peregrinação católica. Segundo a tradição, a casa da Virgem Maria foi transportada miraculosamente para Loreto."
  },
  {
    dia: 11,
    nome: "São Martinho",
    oração: "São Martinho, padroeiro dos pobres, roga por nós.",
    biografia: "São Martinho foi um soldado romano que se converteu ao cristianismo. Conhecido por sua caridade, especialmente com os pobres. Segundo a tradição, dividiu seu manto com um mendigo que era Jesus em disfarce. É padroeiro dos pobres e dos viajantes."
  },
  {
    dia: 12,
    nome: "Nossa Senhora de Guadalupe",
    oração: "Nossa Senhora de Guadalupe, mãe da América, roga por nós.",
    biografia: "Nossa Senhora de Guadalupe é uma aparição de Maria venerada principalmente no México. Segundo a tradição, apareceu a um índio mexicano em 1531. É padroeira do México e da América Latina. Seu santuário é um dos mais visitados do mundo."
  }
];

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
  const randomIndex = Math.floor(Math.random() * SAINT_QUOTES.length);
  return SAINT_QUOTES[randomIndex];
}

function goBack() {
  window.history.back();
}

function navigateTo(page) {
  window.location.href = page;
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// ============================================
// LOCALSTORAGE
// ============================================

const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Erro ao ler do localStorage:', e);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Erro ao remover do localStorage:', e);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Erro ao limpar localStorage:', e);
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

  reset: () => PIN.setPin(PIN.defaultPin),

  changePin: (oldPin, newPin) => {
    if (PIN.verify(oldPin)) {
      PIN.setPin(newPin);
      return true;
    }
    return false;
  },

  forgotPin: () => {
    PIN.reset();
    alert('PIN resetado para: ' + PIN.defaultPin);
  }
};

// ============================================
// TERÇO
// ============================================

const Terco = {
  getTercoProgress: (type) => {
    return Storage.get(`terco_${type}`, {
      count: 0,
      date: null,
      completed: false
    });
  },

  saveTercoProgress: (type, progress) => {
    Storage.set(`terco_${type}`, progress);
  },

  incrementTerco: (type) => {
    const progress = Terco.getTercoProgress(type);
    const maxCount = type === 'mariano' ? 53 : type === 'misericordia' ? 50 : 53; // Terço Mariano = 53 Ave-Marias
    
    if (progress.count < maxCount) {
      progress.count++;
      progress.date = new Date().toISOString();
      
      if (progress.count === maxCount) {
        progress.completed = true;
        Terco.markTercoDay(type);
      }
      
      Terco.saveTercoProgress(type, progress);
      return progress;
    }
    return progress;
  },

  resetTerco: (type) => {
    Terco.saveTercoProgress(type, {
      count: 0,
      date: null,
      completed: false
    });
  },

  markTercoDay: (type) => {
    const today = new Date().toISOString().split('T')[0];
    const calendar = Storage.get('terco_calendar', {});
    
    if (!calendar[today]) {
      calendar[today] = [];
    }
    
    if (!calendar[today].includes(type)) {
      calendar[today].push(type);
    }
    
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
    const encrypted = Storage.get('anotacoes_data', null);
    
    if (!encrypted) return [];
    
    try {
      const decrypted = atob(encrypted);
      return JSON.parse(decrypted);
    } catch (e) {
      return [];
    }
  },

  saveAnotacoes: (anotacoes) => {
    try {
      const encrypted = btoa(JSON.stringify(anotacoes));
      Storage.set('anotacoes_data', encrypted);
    } catch (e) {
      console.error('Erro ao salvar anotações:', e);
    }
  },

  addAnotacao: (titulo, conteudo) => {
    const anotacoes = Anotacoes.getAnotacoes();
    anotacoes.push({
      id: Date.now(),
      titulo,
      conteudo,
      data: new Date().toISOString()
    });
    Anotacoes.saveAnotacoes(anotacoes);
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
      anotacao.titulo = titulo;
      anotacao.conteudo = conteudo;
      Anotacoes.saveAnotacoes(anotacoes);
    }
  }
};

// ============================================
// CONFISSÃO
// ============================================

const Confissao = {
  getConfissoes: () => {
    const encrypted = Storage.get('confissao_data', null);
    
    if (!encrypted) return [];
    
    try {
      const decrypted = atob(encrypted);
      return JSON.parse(decrypted);
    } catch (e) {
      return [];
    }
  },

  saveConfissao: (confissao) => {
    const confissoes = Confissao.getConfissoes();
    confissoes.push({
      id: Date.now(),
      data: new Date().toISOString(),
      ...confissao
    });
    
    try {
      const encrypted = btoa(JSON.stringify(confissoes));
      Storage.set('confissao_data', encrypted);
    } catch (e) {
      console.error('Erro ao salvar confissão:', e);
    }
  }
};

// ============================================
// LITURGIA
// ============================================

const Liturgia = {
  async getLiturgia(dia, mes, ano) {
    try {
      const url = `https://liturgia.acolitos.com.br/api/liturgia?dia=${dia}&mes=${mes}&ano=${ano}`;
      const response = await fetch(url, { timeout: 5000 });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar liturgia');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar liturgia:', error);
      return Liturgia.getFallback();
    }
  },

  getFallback: () => {
    return {
      titulo: "Liturgia Diária",
      leituras: "Não foi possível carregar a liturgia do dia. Verifique sua conexão com a internet.",
      evangelho: "Evangelho não disponível",
      salmo: "Salmo não disponível"
    };
  }
};

// ============================================
// BÍBLIA
// ============================================

const Biblia = {
  async getBiblia(livro) {
    try {
      const livroBuscado = BIBLIA_LIVROS.find(l => l.nome.toLowerCase() === livro.toLowerCase());
      
      if (!livroBuscado) {
        throw new Error('Livro não encontrado');
      }
      
      const nomeArquivo = livro.toLowerCase().replace(/\s+/g, '_').replace(/ã/g, 'a').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u');
      const url = `https://raw.githubusercontent.com/peixebabel/biblia/master/json/${nomeArquivo}.json`;
      
      const response = await fetch(url, { timeout: 5000 });
      
      if (!response.ok) {
        return Biblia.getFallback(livro);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar bíblia:', error);
      return Biblia.getFallback(livro);
    }
  },

  getFallback: (livro) => {
    return {
      name: livro,
      chapters: [
        {
          number: 1,
          verses: [
            {
              number: 1,
              text: "Versículo de exemplo. Conecte-se à internet para carregar o conteúdo completo da Bíblia Católica."
            }
          ]
        }
      ]
    };
  }
};

// ============================================
// SANTO DO DIA
// ============================================

const SantoDoDia = {
  getSantoDoDia: () => {
    const hoje = new Date();
    const dia = hoje.getDate();
    
    const santo = SANTOS_DO_MES.find(s => s.dia === dia);
    return santo || SANTOS_DO_MES[0];
  },

  getSantoDoMes: (mes) => {
    return SANTOS_DO_MES;
  }
};

// ============================================
// LECTIO DIVINA
// ============================================

const LectioDivina = {
  getLectio: () => Storage.get('lectio_data', {
    leitura: '',
    meditacao: '',
    oracao: '',
    contemplacao: ''
  }),

  saveLectio: (lectio) => Storage.set('lectio_data', lectio)
};
