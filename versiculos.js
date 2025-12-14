const versiculos = [
    {
        "texto": "O amor é paciente, o amor é prestativo; não é invejoso, não se ostenta, não se incha de orgulho.",
        "referencia": "1 Coríntios 13,4"
    },
    {
        "texto": "Tudo posso naquele que me fortalece.",
        "referencia": "Filipenses 4,13"
    },
    {
        "texto": "O Senhor é meu pastor, nada me faltará.",
        "referencia": "Salmos 23,1"
    },
    {
        "texto": "Buscai em primeiro lugar o Reino de Deus e a sua justiça, e todas estas coisas vos serão dadas por acréscimo.",
        "referencia": "Mateus 6,33"
    },
    {
        "texto": "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim.",
        "referencia": "João 14,6"
    },
    {
        "texto": "Alegrai-vos sempre no Senhor. Repito: alegrai-vos!",
        "referencia": "Filipenses 4,4"
    },
    {
        "texto": "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
        "referencia": "Mateus 6,21"
    },
    {
        "texto": "Vinde a mim, todos vós que estais cansados e fatigados sob o peso dos vossos fardos, e eu vos darei descanso.",
        "referencia": "Mateus 11,28"
    },
    {
        "texto": "Não vos inquieteis com o dia de amanhã, pois o dia de amanhã trará as suas próprias preocupações. A cada dia basta o seu mal.",
        "referencia": "Mateus 6,34"
    },
    {
        "texto": "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
        "referencia": "Salmos 23,4"
    },
    {
        "texto": "Pois eu conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.",
        "referencia": "Jeremias 29,11"
    },
    {
        "texto": "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
        "referencia": "Eclesiastes 3,1"
    },
    {
        "texto": "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele.",
        "referencia": "Naum 1,7"
    },
    {
        "texto": "Lançai sobre ele toda a vossa preocupação, porque ele tem cuidado de vós.",
        "referencia": "1 Pedro 5,7"
    },
    {
        "texto": "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
        "referencia": "Salmos 46,1"
    },
    {
        "texto": "A fé é o fundamento da esperança, é uma certeza a respeito do que não se vê.",
        "referencia": "Hebreus 11,1"
    },
    {
        "texto": "Portanto, meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor, sabendo que o vosso trabalho não é vão no Senhor.",
        "referencia": "1 Coríntios 15,58"
    },
    {
        "texto": "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê a paz.",
        "referencia": "Números 6,24-26"
    },
    {
        "texto": "O fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.",
        "referencia": "Gálatas 5,22-23"
    },
    {
        "texto": "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
        "referencia": "Salmos 91,1"
    },
    {
        "texto": "Não te deixes vencer pelo mal, mas vence o mal com o bem.",
        "referencia": "Romanos 12,21"
    },
    {
        "texto": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
        "referencia": "João 3,16"
    },
    {
        "texto": "O meu mandamento é este: Amai-vos uns aos outros, assim como eu vos amei.",
        "referencia": "João 15,12"
    },
    {
        "texto": "Se Deus é por nós, quem será contra nós?",
        "referencia": "Romanos 8,31"
    },
    {
        "texto": "O Senhor é a minha luz e a minha salvação; a quem temerei?",
        "referencia": "Salmos 27,1"
    },
    {
        "texto": "Bem-aventurados os que têm fome e sede de justiça, porque serão saciados.",
        "referencia": "Mateus 5,6"
    },
    {
        "texto": "Pedi, e vos será dado; buscai, e achareis; batei, e a porta vos será aberta.",
        "referencia": "Mateus 7,7"
    },
    {
        "texto": "Não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente.",
        "referencia": "Romanos 12,2"
    },
    {
        "texto": "Sede alegres na esperança, pacientes na tribulação, perseverantes na oração.",
        "referencia": "Romanos 12,12"
    },
    {
        "texto": "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
        "referencia": "Filipenses 4,7"
    },
    {
        "texto": "O temor do Senhor é o princípio da sabedoria.",
        "referencia": "Provérbios 9,10"
    },
    {
        "texto": "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
        "referencia": "Provérbios 3,5"
    },
    {
        "texto": "Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.",
        "referencia": "Provérbios 22,6"
    },
    {
        "texto": "Honra teu pai e tua mãe, para que se prolonguem os teus dias na terra que o Senhor teu Deus te dá.",
        "referencia": "Êxodo 20,12"
    },
    {
        "texto": "Sede, pois, imitadores de Deus, como filhos amados.",
        "referencia": "Efésios 5,1"
    },
    {
        "texto": "Tudo o que fizerdes, fazei-o de todo o coração, como para o Senhor, e não para os homens.",
        "referencia": "Colossenses 3,23"
    },
    {
        "texto": "A oração feita por um justo pode muito em seus efeitos.",
        "referencia": "Tiago 5,16"
    },
    {
        "texto": "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
        "referencia": "1 João 1,9"
    },
    {
        "texto": "Não vos vingueis a vós mesmos, amados, mas dai lugar à ira de Deus, pois está escrito: 'A mim pertence a vingança; eu é que retribuirei', diz o Senhor.",
        "referencia": "Romanos 12,19"
    },
    {
        "texto": "O Senhor é compassivo e misericordioso, longânimo e assaz benigno.",
        "referencia": "Salmos 103,8"
    },
    {
        "texto": "Ainda que a figueira não floresça, nem haja fruto na vide; ainda que o produto da oliveira minta, e os campos não produzam mantimento; ainda que o rebanho seja exterminado do curral e não haja gado nos estábulos; todavia eu me alegrarei no Senhor, exultarei no Deus da minha salvação.",
        "referencia": "Habacuque 3,17-18"
    },
    {
        "texto": "O Senhor não retarda a sua promessa, ainda que alguns a julguem demorada; pelo contrário, ele é paciente para convosco, não querendo que ninguém se perca, mas que todos cheguem ao arrependimento.",
        "referencia": "2 Pedro 3,9"
    },
    {
        "texto": "Portanto, se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.",
        "referencia": "2 Coríntios 5,17"
    },
    {
        "texto": "O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida e a tenham em abundância.",
        "referencia": "João 10,10"
    },
    {
        "texto": "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele comigo.",
        "referencia": "Apocalipse 3,20"
    },
    {
        "texto": "Não vos deixeis vencer pelo sono, mas vigiai e orai, para não cairdes em tentação.",
        "referencia": "Mateus 26,41"
    },
    {
        "texto": "Porque para Deus nada é impossível.",
        "referencia": "Lucas 1,37"
    },
    {
        "texto": "Amai os vossos inimigos e orai pelos que vos perseguem.",
        "referencia": "Mateus 5,44"
    },
    {
        "texto": "Mas a sabedoria que vem do alto é, primeiramente, pura; depois, pacífica, gentil, dócil, cheia de misericórdia e de bons frutos, imparcial e sincera.",
        "referencia": "Tiago 3,17"
    },
    {
        "texto": "Eis que venho sem demora; guarda o que tens, para que ninguém tome a tua coroa.",
        "referencia": "Apocalipse 3,11"
    }
];

function getVersiculoDoDia() {
    // Obter a data atual (apenas o dia do ano)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // Começa em 1 de janeiro
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay); // Dia do ano (0-indexado)
    // Usar o dia do ano para determinar o índice do versículo
    // O operador % garante que o índice volte ao início após o último versículo
    const index = dayOfYear % versiculos.length;
    
    return versiculos[index];
}

// Função para exibir o versículo na home.html
function displayVersiculoDoDia() {
    const versiculo = getVersiculoDoDia();
    const container = document.getElementById('daily-verse-container');
    
    if (container) {
        container.innerHTML = `
            <blockquote class="daily-verse-text">"${versiculo.texto}"</blockquote>
            <cite class="daily-verse-author">— ${versiculo.referencia}</cite>
        `;
    }
}

// Adicionar a chamada da função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o container do versículo existe (apenas na home)
    if (document.getElementById('daily-verse-container')) {
        displayVersiculoDoDia();
    }
});
