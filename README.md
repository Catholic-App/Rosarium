# Rosarium - HTML Puro

Aplicativo web de devoção católica 100% em HTML, CSS e JavaScript puros. Sem dependências, sem build, sem frameworks.

## 📁 Estrutura do Projeto

```
misericordia-html/
├── index.html                    # Splash Screen
├── home.html                     # Página Principal
├── terco.html                    # Seleção de Terço
├── terco-mariano.html            # Terço Mariano
├── terco-misericordia.html       # Terço da Misericórdia
├── rosario.html                  # Rosário Completo
├── liturgia.html                 # Liturgia Diária + Lectio Divina
├── biblia.html                   # Bíblia Católica
├── anotacoes.html                # Anotações com PIN
├── santo-do-dia.html             # Santo do Dia
├── confissao.html                # Confissão
├── configuracoes.html            # Configurações
├── calendario-terco.html         # Calendário de Terços
├── style.css                     # CSS Único
├── app.js                        # JavaScript Único
└── /assets                       # Imagens e ícones
    ├── /icons
    ├── /images
    └── /splash
```

## 🚀 Como Usar

### Localmente
1. Abra `index.html` no navegador
2. Ou use um servidor local:
   ```bash
   python -m http.server 8000
   # Acesse http://localhost:8000
   ```

### No Vercel
1. Faça upload dos arquivos para um repositório GitHub
2. Conecte ao Vercel
3. Deploy automático!

## ✨ Funcionalidades

### 1. **Splash Screen**
- Frase de santo aleatória
- Animação fade-in/out
- Redirecionamento automático

### 2. **Terço**
- Terço Mariano (15 contas)
- Rosário Completo (20 contas)
- Terço da Misericórdia (15 contas)
- Contador visual com bolinhas
- Barra de progresso
- Calendário de terços rezados

### 3. **Bíblia Católica**
- 73 livros (Antigo e Novo Testamento)
- Pesquisa por livro
- Leitor de capítulos
- Integração com API externa
- Fallback local se offline

### 4. **Liturgia Diária**
- Seletor de data
- Integração com API liturgia.acolitos.com.br
- Lectio Divina com 4 etapas
- Anotações por etapa

### 5. **Anotações Privadas**
- Proteção por PIN (4 dígitos)
- Criar, editar, excluir
- Salvo em localStorage

### 6. **Santo do Dia**
- Informações do santo
- Oração
- Histórico do mês

### 7. **Confissão**
- Exame de consciência completo
- 15 categorias de pecados
- Histórico de confissões
- Proteção por PIN

## 🔐 Segurança

- **PIN Padrão:** 1234
- Dados salvos localmente em localStorage
- "Criptografia" básica com base64 (para demonstração)
- Sem envio de dados para servidores externos

## 🎨 Design

- **Paleta de Cores:** OKLCH (Azul Royal, Dourado, Rosa)
- **Responsivo:** Mobile, Tablet, Desktop
- **Animações:** Suaves e elegantes
- **Tipografia:** Legível e profissional

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móveis

## 🔄 APIs Externas

### Liturgia Diária
```
https://liturgia.acolitos.com.br/api/liturgia?dia=DD&mes=MM&ano=YYYY
```

### Bíblia
```
https://raw.githubusercontent.com/peixebabel/biblia/master/json/{livro}.json
```

## 💾 Dados Locais

Todos os dados são salvos em `localStorage`:
- `terco_mariano` - Progresso do Terço Mariano
- `terco_rosario` - Progresso do Rosário
- `terco_misericordia` - Progresso do Terço da Misericórdia
- `terco_calendar` - Calendário de terços rezados
- `anotacoes_data` - Anotações (criptografadas)
- `confissao_data` - Confissões (criptografadas)
- `app_pin` - PIN do usuário

## 🛠️ Customização

### Alterar PIN Padrão
Edite `app.js`, linha ~200:
```javascript
const PIN = {
  defaultPin: '1234',  // ← Altere aqui
  ...
}
```

### Alterar Cores
Edite `style.css`, linhas ~1-50:
```css
:root {
  --primary: oklch(55% 0.2 265);  /* Azul */
  --accent: oklch(72% 0.15 60);   /* Dourado */
  ...
}
```

### Adicionar Novos Santos
Edite `app.js`, linha ~60:
```javascript
const SANTOS_DO_MES = [
  { dia: 1, nome: "Santo André", oração: "..." },
  // Adicione mais aqui
];
```

## 📝 Notas

- Sem dependências externas
- Sem build process
- Sem servidor necessário
- Funciona 100% offline (exceto APIs)
- Pronto para Vercel/Netlify/GitHub Pages

## 📄 Licença

Desenvolvido com ❤️ para a comunidade católica.

## 🤝 Suporte

Para dúvidas ou sugestões, consulte a documentação do código ou abra uma issue.

---

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2024
