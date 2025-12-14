// liturgia_diaria.js

// Variáveis globais
let currentReadingIndex = 0; 
let currentLiturgia = null; 
let currentDate = new Date();
let liturgiaData = {};

// Formata a data exibida
function formatDisplayDate(date) {
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// Formato AAAA-MM-DD
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Avançar/voltar um dia
function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset);
    updateDateDisplay();
}

// Atualiza data e carrega liturgia
function updateDateDisplay() {
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) dateDisplay.textContent = formatDisplayDate(currentDate);
    displayLiturgia(currentDate);
}

// Selecionar aba
function selectReading(index) {
    currentReadingIndex = index;
    renderLiturgiaContent();
}

// Renderização da liturgia
function renderLiturgiaContent() {
    const container = document.getElementById('liturgia-container');
    if (!container || !currentLiturgia) return;

    // Renderizar header apenas 1 vez
    if (!document.getElementById('liturgia-nav-header')) {
        container.innerHTML = `
            <div class="liturgia-header" id="liturgia-nav-header">
                <button id="prev-day" class="btn btn-outline btn-sm">← Anterior</button>
                <h2 id="date-display" class="page-title" style="margin: 0; font-size: 1.2rem;"></h2>
                <button id="next-day" class="btn btn-outline btn-sm">Próximo →</button>
            </div>
            <div id="liturgia-data-display"></div>
            <div class="tabs-nav" id="tabs-nav"></div>
            <div id="leitura-content"></div>
        `;

        document.getElementById('prev-day').addEventListener('click', () => changeDay(-1));
        document.getElementById('next-day').addEventListener('click', () => changeDay(1));
    }

    // Atualizar data no header
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) dateDisplay.textContent = formatDisplayDate(currentDate);

    // Titulação adicional
    const liturgiaDataDisplay = document.getElementById('liturgia-data-display');
    const dateParts = currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).split(' ');
    const corLiturgica = currentLiturgia.cor ? currentLiturgia.cor.charAt(0).toUpperCase() + currentLiturgia.cor.slice(1) : "Não informada";

    liturgiaDataDisplay.innerHTML = `
        <div class="liturgia-data">
            <div class="dia">${dateParts[0]}</div>
            <div class="mes-ano">${dateParts[1].toUpperCase()} ${dateParts[2]}</div>
            <div class="cor-liturgica">Cor Litúrgica: ${corLiturgica}</div>
            <h3 class="titulo-celebracao">${currentLiturgia.titulo}</h3>
        </div>
    `;

    // Abas
    const tabsNav = document.getElementById('tabs-nav');
    tabsNav.innerHTML = '';

    currentLiturgia.leituras.forEach((leitura, idx) => {
        let titulo = leitura.titulo;

        if (titulo.includes("Primeira")) titulo = "1 LEITURA";
        else if (titulo.includes("Salmo")) titulo = "SALMO";
        else if (titulo.includes("Segunda")) titulo = "2 LEITURA";
        else if (titulo.includes("Evangelho")) titulo = "EVANGELHO";

        const btn = document.createElement('button');
        btn.className = "tab-button" + (idx === currentReadingIndex ? " active" : "");
        btn.textContent = titulo;
        btn.onclick = () => selectReading(idx);

        tabsNav.appendChild(btn);
    });

    // Conteúdo da leitura
    const leituraContent = document.getElementById('leitura-content');
    const leitura = currentLiturgia.leituras[currentReadingIndex];

    if (leitura) {
        leituraContent.innerHTML = `
            <div class="card leitura-item">
                <h4 class="leitura-titulo">${leitura.titulo}</h4>
                <p class="leitura-subtitulo">${leitura.referencia}</p>
                <div class="leitura-texto">
                    ${window.formatReadingText(leitura.texto, leitura.titulo)}
                </div>
            </div>
        `;
    } else {
        leituraContent.innerHTML = "<p>Leitura não encontrada.</p>";
    }
}

// Carregar o JSON
async function loadLiturgiaData() {
    try {
        const response = await fetch("liturgia_diaria_2025_2026.json");
        liturgiaData = await response.json();
    } catch (e) {
        console.error("Erro ao carregar JSON:", e);
    }
}

// Exibir liturgia do dia
function displayLiturgia(date) {
    const dateStr = formatDate(date);
    const liturgia = liturgiaData[dateStr];
    const container = document.getElementById("liturgia-container");

    if (!container) return;

    if (!liturgia) {
        container.innerHTML = `<p>Liturgia não encontrada para ${dateStr}.</p>`;
        return;
    }

    const leituras = [...liturgia.leituras];

    if (liturgia.evangelho) {
        leituras.push({
            titulo: liturgia.evangelho_titulo,
            referencia: liturgia.evangelho_referencia,
            texto: liturgia.evangelho
        });
    }

    // Reordenar as leituras
    const ordem_desejada = ["Primeira Leitura", "Salmo Responsorial", "Segunda Leitura", "Evangelho"];
    const leituras_ordenadas = [];

    ordem_desejada.forEach(titulo_desejado => {
        const leitura_encontrada = leituras.find(l => l.titulo.includes(titulo_desejado));
        if (leitura_encontrada) {
            leituras_ordenadas.push(leitura_encontrada);
        }
    });

    // Adicionar leituras que não se encaixam no padrão (se houver)
    leituras.forEach(leitura => {
        if (!leituras_ordenadas.includes(leitura)) {
            leituras_ordenadas.push(leitura);
        }
    });

    // Encontrar o Evangelho para a Lectio Divina
    const evangelho = leituras.find(l => l.titulo.includes("Evangelho"));
    if (evangelho) {
        // O texto do evangelho precisa ser formatado antes de salvar
        const textoFormatado = window.formatReadingText(evangelho.texto, evangelho.titulo);
        localStorage.setItem('lectio_evangelho_texto', textoFormatado);
        localStorage.setItem('lectio_evangelho_referencia', evangelho.referencia);
    } else {
        localStorage.removeItem('lectio_evangelho_texto');
        localStorage.removeItem('lectio_evangelho_referencia');
    }

    currentLiturgia = {
        ...liturgia,
        leituras: leituras_ordenadas
    };

    currentReadingIndex = 0;
    renderLiturgiaContent();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadLiturgiaData();
    updateDateDisplay();
});

// Exportar
window.displayLiturgia = displayLiturgia;
window.formatDate = formatDate;
window.changeDay = changeDay;
window.selectReading = selectReading;
window.renderLiturgiaContent = renderLiturgiaContent;