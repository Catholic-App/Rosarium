// format_text.js (VERSÃO UNIVERSAL)
(function(){

  function applyMarkdownBold(text){
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<strong>$1</strong>");
  }

  function normalize(text){
    return String(text || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .trim();
  }

  window.formatReadingText = function(texto, titulo){
    texto = normalize(texto);
    if(!texto) return "";

    const isSalmo = titulo.toLowerCase().includes("salmo");

    if(isSalmo){

      // --- 1) NORMALIZA OS HÍFENS INICIAIS ---
      // remove "- -" e transforma em "- "
      texto = texto.replace(/^\s*-\s*-\s*/gm, "- ");

      // garante "- " no início das estrofes
      texto = texto.replace(/^\s*-\s*/gm, "- ");

      // --- 2) SEPARA ESTRÓFES POR HÍFEN INICIAL ---
      let estrofes = texto
        .split(/\n(?=\-\s)/)   // quebra sempre antes de "- "
        .map(e => e.trim())
        .filter(e => e.length > 0);

      // --- 3) REMOVE O HÍFEN E JUNTA QUEBRAS INTERNAS ---
      estrofes = estrofes.map(e => {

        // remove hífen inicial
        e = e.replace(/^\-\s*/, "");

        // remove quebras internas tipo "alma,\nalma"
        e = e.replace(/\n+/g, " ");

        return e.trim();
      });

      // --- 4) DETECTA SEGUNDA OCORRÊNCIA DO REFRÃO ---
      const count = {};
      const finalHtml = [];

      for(let e of estrofes){

        let key = e.toLowerCase();

        count[key] = (count[key] || 0) + 1;
        let isSecond = count[key] === 2;

        // aplica negrito de markdown
        let html = applyMarkdownBold(e);

        // refrão repetido fica em negrito
        if(isSecond){
          html = "<strong>" + html + "</strong>";
        }

        finalHtml.push(`<p>- ${html}</p>`);
      }

      return finalHtml.join("\n");
    }

	    // --- LEITURAS NORMAIS (1ª, 2ª, EVANGELHO) ---
	    // Formato Canção Nova: Texto corrido, apenas com quebras de parágrafo no final
	    
	    // 1. Remove todas as quebras de linha e substitui por espaço
	    let texto_corrido = texto.replace(/\n+/g, " ");
	    
	    // 2. Remove espaços múltiplos
	    texto_corrido = texto_corrido.replace(/\s+/g, " ");
	    
	    // 3. Aplica negrito de markdown
	    texto_corrido = applyMarkdownBold(texto_corrido);
	    
	    // 4. Envolve em um único parágrafo
	    return `<p>${texto_corrido.trim()}</p>`;
  };

})();