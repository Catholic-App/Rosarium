// biblia.js

(function() {
    "use strict";

    // Variável para armazenar o JSON da Bíblia
    let bibliaData = null;

    // Variável para armazenar a lista de livros para acesso rápido
    let livrosList = [];

    const Biblia = {
        // Função para carregar o arquivo JSON da Bíblia
        async loadData() {
            if (bibliaData) {
                console.log("Dados da Bíblia já carregados.");
                return;
            }

            try {
                // Tenta carregar o JSON localmente
                const response = await fetch('/biblia_ave_maria.json');
                if (!response.ok) {
                    throw new Error(`Erro ao carregar biblia_ave_maria.json: ${response.statusText}`);
                }
                const json = await response.json();
                
                // Estrutura do JSON: { "antigoTestamento": [ { nome, capitulos: [ { versiculos: [] } ] } ], "novoTestamento": [...] }
                bibliaData = json;
                
                // Prepara a lista de livros para a função getLivros()
                livrosList = [];
                
                // Antigo Testamento
                if (bibliaData.antigoTestamento) {
                    bibliaData.antigoTestamento.forEach(livro => {
                        livrosList.push({
                            nome: livro.nome,
                            abreviacao: livro.abreviacao || livro.nome.substring(0, 3), // Adiciona abreviação se não existir
                            capitulos: livro.capitulos.length,
                            testamento: 'antigo'
                        });
                    });
                }

                // Novo Testamento
                if (bibliaData.novoTestamento) {
                    bibliaData.novoTestamento.forEach(livro => {
                        livrosList.push({
                            nome: livro.nome,
                            abreviacao: livro.abreviacao || livro.nome.substring(0, 3),
                            capitulos: livro.capitulos.length,
                            testamento: 'novo'
                        });
                    });
                }

                console.log("Dados da Bíblia carregados com sucesso.");
            } catch (error) {
                console.error("Erro fatal ao carregar a Bíblia:", error);
                // Em caso de falha, inicializa com dados vazios
                bibliaData = { antigoTestamento: [], novoTestamento: [] };
                livrosList = [];
            }
        },

        // Retorna a lista de todos os livros
        getLivros() {
            return livrosList;
        },

        // Retorna o objeto completo de um livro (com todos os capítulos e versículos)
        getBiblia(bookName) {
            if (!bibliaData) return null;

            const search = (testamento) => {
                return testamento.find(livro => livro.nome === bookName);
            };

            let livro = search(bibliaData.antigoTestamento || []);
            if (livro) return livro;

            livro = search(bibliaData.novoTestamento || []);
            return livro;
        },

        // Retorna um capítulo específico de um livro
        getChapter(bookName, chapterNumber) {
            const livro = this.getBiblia(bookName);
            if (!livro || !livro.capitulos) return null;

            // O array de capítulos é 0-indexed, mas os capítulos são 1-indexed
            const chapter = livro.capitulos[chapterNumber - 1];
            
            // Ajusta a estrutura para o formato esperado pelo HTML (versiculos: [{number, text}])
            if (chapter && chapter.versiculos) {
                return {
                    nome: livro.nome,
                    capitulo: chapterNumber,
                    versiculos: chapter.versiculos.map(v => ({
                        number: v.versiculo,
                        text: v.texto
                    }))
                };
            }

            return null;
        }
    };

    // Expõe a lógica da Bíblia no namespace App
    window.App = window.App || {};
    window.App.Biblia = Biblia;

    // Inicializa o carregamento dos dados da Bíblia
    document.addEventListener('DOMContentLoaded', () => {
        // A função initBooks no biblia.html chamará App.Biblia.getLivros(),
        // então o carregamento deve ser feito antes.
        // Como o JSON é grande, é melhor carregar apenas quando a página da Bíblia for acessada.
        // A função initBooks() no biblia.html será modificada para chamar loadData()
    });

})();
