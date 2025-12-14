// lectio_divina.js

// A função Storage.get e Storage.set é presumida estar disponível via app.js ou outro script.

let currentLectioStep = 1;

function startLectio() {
  document.getElementById('liturgia-container').style.display = 'none';
  document.getElementById('lectio-button-container').style.display = 'none';
  document.getElementById('lectio-container').classList.remove('hidden');
  selectLectioStep(1);
}

function selectLectioStep(step) {
  currentLectioStep = step;
  
  // Atualizar botões
  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`step-${i}-btn`);
    if (i === step) {
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.add('btn-outline');
    }
  }
  
  let evangelhoTexto = localStorage.getItem('lectio_evangelho_texto');
  let evangelhoReferencia = localStorage.getItem('lectio_evangelho_referencia');
  
  // Se não houver dados, define os padrões
  if (!evangelhoTexto) {
    evangelhoTexto = 'Texto do Evangelho não disponível.';
    evangelhoReferencia = 'Referência não disponível.';
  }
  
  // Atualizar conteúdo
  const titles = [
    '1. Leitura',
    '2. Meditação',
    '3. Oração',
    '4. Contemplação'
  ];
  
  let content = '';
  
  if (step === 1) {
      content = `
        <h3 style="margin-bottom: 0.5rem; font-weight: 600;">${evangelhoReferencia}</h3>
        ${evangelhoTexto}
        <p style="margin-top: 1rem;">Leia atentamente a passagem bíblica da Liturgia Diária. Deixe a Palavra de Deus falar ao seu coração.</p>
      `;
  } else if (step === 2) {
      content = `<p>Medite sobre o que você leu. O que Deus quer dizer para você através dessa passagem?</p>`;
  } else if (step === 3) {
      content = `<p>Ore respondendo ao que Deus lhe disse. Converse com Deus sobre seus sentimentos e compreensão.</p>`;
  } else if (step === 4) {
      content = `<p>Contemple a presença de Deus. Descanse em silêncio na presença do Senhor.</p>`;
  }
  
  document.getElementById('step-title').textContent = titles[step - 1];
  document.getElementById('step-content').innerHTML = content;
  
  // Carregar notas salvas
  // A função Storage.get é presumida estar disponível
  const saved = Storage.get(`lectio_step_${step}`, '');
  document.getElementById('step-notes').value = saved;
}

function saveLectioStep() {
  const notes = document.getElementById('step-notes').value;
  // A função Storage.set é presumida estar disponível
  Storage.set(`lectio_step_${currentLectioStep}`, notes);
  
  // Salvar na área de Anotações
  let savedToAnotacoes = false;
  if (notes && notes.trim() !== '') {
      const stepName = document.getElementById('step-title').textContent;
      const date = new Date().toLocaleDateString('pt-BR');
      const titulo = `Lectio Divina - ${stepName} (${date})`;
      window.Anotacoes.saveAnotacaoFromSource(titulo, notes, 'Lectio Divina');
      savedToAnotacoes = true;
  }
  
  if (savedToAnotacoes) {
      alert('Anotações salvas com sucesso! (Salvas também na área de Anotações)');
  } else {
      alert('Anotações salvas com sucesso!');
  }
}

function closeLectio() {
  document.getElementById('lectio-container').classList.add('hidden');
  document.getElementById('liturgia-container').style.display = 'block';
  document.getElementById('lectio-button-container').style.display = 'block';
}

// Exportar funções para uso no HTML
window.startLectio = startLectio;
window.selectLectioStep = selectLectioStep;
window.saveLectioStep = saveLectioStep;
window.closeLectio = closeLectio;
