/* ============================================================
   Sistema Santo do Dia - Rosarium
   Fonte: Vaticano (oficial) + fallback Canção Nova
   Imagens em: /img/santos/NOME_DO_ARQUIVO.jpg
   ============================================================ */

// Carrega JSON oficial ou o fallback
async function loadSantosData() {
  try {
    const res = await fetch("data/santos-oficial.json");
    return await res.json();
  } catch (e) {
    console.warn("Erro no arquivo oficial. Usando fallback.");
    const res = await fetch("data/santos-fallback.json");
    return await res.json();
  }
}

// Retorna o santo do dia
async function getSantoDoDia() {
  const data = await loadSantosData();
  const hoje = new Date();
  const mes = hoje.getMonth() + 1;
  const dia = hoje.getDate();

  const chave = `${mes}-${dia}`;

  // Pode haver 1 ou vários santos
  if (data[chave]) return data[chave];

  // caso não tenha santo no dia → fallback Canção Nova sempre tem
  if (data.fallback && data.fallback[chave]) return data.fallback[chave];

  return [{
    nome: "Santo Desconhecido",
    descricao: "Não há registro oficial para este dia.",
    oracao: "Abençoai-nos, Senhor.",
    imagem: "default.jpg"
  }];
}

// Retorna lista completa do mês
async function getSantosDoMes() {
  const data = await loadSantosData();
  const hoje = new Date();
  const mes = hoje.getMonth() + 1;

  let lista = [];

  for (let dia = 1; dia <= 31; dia++) {
    const chave = `${mes}-${dia}`;

    if (data[chave]) {
      const santos = Array.isArray(data[chave]) ? data[chave] : [data[chave]];
      santos.forEach(s => lista.push({ dia, ...s }));
    }
  }
  return lista;
}

window.SantoDoDia = {
  getSantoDoDia,
  getSantosDoMes
};