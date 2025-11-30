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
    
    // Adicionar listeners para navegação
    document.getElementById('prev-day').addEventListener('click', () => navigateDay(-1));
    document.getElementById('next-day').addEventListener('click', () => navigateDay(1));
}

// Função para navegar entre os dias
function navigateDay(offset) {
    const currentDisplayDate = new Date(document.getElementById('santo-container').dataset.currentDate);
    currentDisplayDate.setDate(currentDisplayDate.getDate() + offset);
    displaySantoDoDia(currentDisplayDate);
}

// Função para exibir o Santo do Dia
function displaySantoDoDia(date) {
    const santo = getSantoDoDia(date);
    const container = document.getElementById('santo-container');
    const dateDisplay = document.getElementById('date-display');
    
    // Armazenar a data atual no container para navegação
    container.dataset.currentDate = date.toISOString().split('T')[0];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = date.toLocaleDateString('pt-BR', options);

    if (santo) {
        container.innerHTML = `
            <h3 class="card-title">${santo.nome}</h3>
            <div class="santo-image-container" style="text-align: center; margin-bottom: 1rem;">
                <img src="assets/santos/${santo.imagem}" alt="${santo.nome}" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
            <div class="card-content">
                <p>${santo.biografia}</p>
                <p style="margin-top: 1rem; font-style: italic;">Cor Litúrgica: ${santo.cor}</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <h3 class="card-title">Santo do Dia</h3>
            <div class="card-content">
                <p>Nenhum santo ou beato encontrado para esta data.</p>
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
