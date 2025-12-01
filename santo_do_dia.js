// Variáveis globais para armazenar os dados
let santosData = {};
let santosLista = {};

// Função para carregar os dados dos santos
async function loadSantosData() {
    try {
        // Carregar dados detalhados dos santos
        const dataResponse = await fetch('santos_data.json');
        santosData = await dataResponse.json();

        // Carregar lista de santos por mês
        const listaResponse = await fetch('santos_lista.json');
        santosLista = await listaResponse.json();

        console.log('Dados dos Santos carregados com sucesso.');
        
        // Inicializar a página do Santo do Dia
        if (document.getElementById('santo-container')) {
            initSantoDoDia();
        }
        
        // Inicializar a página da Lista de Santos
        if (document.getElementById('lista-santos-container')) {
            initListaSantos();
        }

    } catch (error) {
        console.error('Erro ao carregar dados dos Santos:', error);
        // Exibir mensagem de erro se a página do Santo do Dia estiver aberta
        if (document.getElementById('santo-container')) {
            document.getElementById('santo-container').innerHTML = '<p style="color: var(--destructive);">Erro ao carregar dados dos Santos. Verifique a integridade dos arquivos.</p>';
        }
    }
}

// Função para obter o Santo do Dia
function getSantoDoDia(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const key = `${month}-${day}`;
    
    return santosData[key] || null;
}

// Função para inicializar a página do Santo do Dia
function initSantoDoDia() {
    const today = new Date();
    displaySantoDoDia(today);
}

// Função para exibir o Santo do Dia
function displaySantoDoDia(date) {
    const santo = getSantoDoDia(date);
    const container = document.getElementById('santo-container');
    const pageTitle = document.querySelector('.page-title');

    const options = { day: 'numeric', month: 'long' };
    const dateText = date.toLocaleDateString('pt-BR', options);

    if (santo) {
        // Mantém o título da página como "Santo do Dia"
        pageTitle.textContent = 'Santo do Dia';

        container.innerHTML = `
            <div class="santo-header-card" style="text-align: center; margin-bottom: 1.5rem;">
                <h3 class="card-title" style="margin-bottom: 0.25rem;">${santo.titulo || santo.nome}</h3>
                <p class="text-sm text-muted-foreground">${dateText}</p>
            </div>

                <h4 class="card-title" style="margin-top: 1.5rem;">Biografia:</h4>
                <p><strong>${santo.titulo || santo.nome}</strong></p>
                <p>${santo.biografia}</p>
                <p style="margin-top: 1rem; font-style: italic;">Cor Litúrgica: ${santo.cor}</p>
            </div>
        `;
    } else {
        // Mantém o título da página como "Santo do Dia"
        pageTitle.textContent = 'Santo do Dia';

        container.innerHTML = `
            <div class="card-content" style="text-align: center;">
                <h3 class="card-title">Santo do Dia</h3>
                <p class="text-sm text-muted-foreground">${dateText}</p>
                <p style="margin-top: 1rem;">Nenhum santo ou beato encontrado para esta data.</p>
            </div>
        `;
    }
}

// Função para inicializar a página da Lista de Santos
function initListaSantos() {
    const container = document.getElementById('lista-santos-container');
    container.innerHTML = ''; // Limpar conteúdo existente
    
    // Criar seletor de mês
    const monthSelector = document.createElement('div');
    monthSelector.className = 'form-group';
    monthSelector.innerHTML = `
        <label class="label">Selecione o Mês:</label>
        <select id="month-select" class="input" onchange="displayListaSantos()">
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>
    `;
    container.appendChild(monthSelector);
    
    // Criar container para a lista
    const listaContainer = document.createElement('div');
    listaContainer.id = 'santos-list';
    container.appendChild(listaContainer);
    
    // Selecionar o mês atual por padrão
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    document.getElementById('month-select').value = currentMonth;
    
    displayListaSantos();
}

// Função para exibir a lista de santos do mês selecionado
function displayListaSantos() {
    const month = document.getElementById('month-select').value;
    const list = santosLista[month];
    const listContainer = document.getElementById('santos-list');
    
    if (list && list.length > 0) {
        let html = '<ul class="list-group">';
        list.forEach(santo => {
            html += `
                <li class="list-item">
                    <span class="badge">${santo.dia}</span>
                    <span>${santo.nome}</span>
                </li>
            `;
        });
        html += '</ul>';
        listContainer.innerHTML = html;
    } else {
        listContainer.innerHTML = '<p>Nenhum santo encontrado para este mês.</p>';
    }
}

// Iniciar o carregamento dos dados
loadSantosData();
