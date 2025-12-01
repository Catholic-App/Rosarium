// liturgia_diaria.js

// Carregar o JSON da Liturgia Diária
let liturgiaData = {};

async function loadLiturgiaData() {
    try {
        const response = await fetch('liturgia_diaria_2025_2026.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // O JSON já está em um formato de fácil edição manual (chave: data, valor: objeto liturgia)
        liturgiaData = await response.json();
        console.log("Dados da Liturgia Diária carregados com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar os dados da Liturgia Diária:", error.message);
    }
}

// Função para formatar a data no formato YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Função para exibir a Liturgia Diária
function displayLiturgia(date) {
    const dateStr = formatDate(date);
    const liturgia = liturgiaData[dateStr];
    const container = document.getElementById('liturgia-container');
    
    if (!container) return;

    if (!liturgia) {
        container.innerHTML = `<p>Liturgia Diária não encontrada para ${dateStr}.</p>`;
        // Limpar dados da Lectio Divina
        localStorage.removeItem('lectio_evangelho_texto');
        localStorage.removeItem('lectio_evangelho_referencia');
        return;
    }

    let html = `
        <h2 class="liturgia-titulo" style="color: ${liturgia.cor};">${liturgia.titulo}</h2>
        <div class="liturgia-leituras">
    `;

    let evangelhoTexto = '';
    let evangelhoReferencia = '';

    // Leituras
    liturgia.leituras.forEach(leitura => {
        html += `
            <div class="leitura-item">
                <h3 class="leitura-titulo">${leitura.titulo} (${leitura.referencia})</h3>
                <div class="leitura-texto">${leitura.texto.replace(/\\n/g, '<br>')}</div>
            </div>
        `;
        
        if (leitura.titulo.includes('Evangelho')) {
            // Armazenar o texto já com as quebras de linha HTML para exibição correta na Lectio Divina
            evangelhoTexto = leitura.texto.replace(/\\n/g, '<br>');
            evangelhoReferencia = leitura.referencia;
        }
    });

    html += `</div>`;
    container.innerHTML = html;
    
    // Armazenar o texto do Evangelho para a Lectio Divina
    // O texto já está formatado com <br> se a lógica acima estiver correta
    if (evangelhoTexto && evangelhoReferencia) {
        localStorage.setItem('lectio_evangelho_texto', evangelhoTexto);
        localStorage.setItem('lectio_evangelho_referencia', evangelhoReferencia);
    } else {
        // Se não houver Evangelho, armazena strings vazias para evitar o erro de "Referência não disponível"
        localStorage.setItem('lectio_evangelho_texto', '');
        localStorage.setItem('lectio_evangelho_referencia', '');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadLiturgiaData();
    
    // Obter a data atual ou a data selecionada
    const today = new Date();
    
    // Adicionar lógica de navegação de data (botões de próxima/anterior)
    const prevDayButton = document.getElementById('prev-day');
    const nextDayButton = document.getElementById('next-day');
    const dateDisplay = document.getElementById('date-display');
    
    let currentDate = today;
    
    function updateDateDisplay() {
        dateDisplay.textContent = currentDate.toLocaleDateString('pt-BR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        displayLiturgia(currentDate);
    }
    
    if (prevDayButton && nextDayButton && dateDisplay) {
        prevDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            updateDateDisplay();
        });
        
        nextDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDateDisplay();
        });
        
        updateDateDisplay(); // Exibir a liturgia inicial
    }
});

// Exportar funções para uso em outros scripts, se necessário
window.displayLiturgia = displayLiturgia;
window.loadLiturgiaData = loadLiturgiaData;
window.liturgiaData = liturgiaData;
window.formatDate = formatDate; // Exportar para uso na Lectio Divina
