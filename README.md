# Descobrindo Brusque

Um jogo educativo em formato de quiz interativo para ensinar crianças (6 a 12 anos) sobre a história e cultura da cidade de Brusque – SC. 

Projeto desenvolvido em parceria com a UNIFEBE e a Prefeitura Municipal de Brusque – Curso de Sistemas de Informação – 2026.

## 🚀 Como Rodar o Jogo

O jogo foi desenvolvido com tecnologias web nativas (HTML5, CSS3, JS Vanilla), o que significa que não requer servidor, dependências (Node.js/npm) ou frameworks complexos.

Para rodar:
1. Extraia os arquivos.
2. Dê um duplo-clique no arquivo `index.html` para abri-lo diretamente no seu navegador de internet (Google Chrome, Edge, Firefox, etc).
3. (Opcional) Para uma melhor experiência de desenvolvimento, você pode abrir com um servidor local simples como a extensão *Live Server* do VSCode.

## 📝 Como Adicionar ou Editar Perguntas

O banco de dados de perguntas está localizado em `src/js/questions.js`.
As perguntas estão estruturadas em um Array de objetos JSON.

Para adicionar uma nova pergunta, siga o formato abaixo dentro do nível desejado (Fácil, Médio, Difícil):

```javascript
{
    id: 16,
    level: "facil", // ou "medio", "dificil"
    question: "SUA PERGUNTA EM CAIXA ALTA AQUI",
    alternatives: [
        "ALTERNATIVA 1",
        "ALTERNATIVA 2",
        "ALTERNATIVA 3",
        "ALTERNATIVA CORRETA"
    ],
    correctAnswer: "ALTERNATIVA CORRETA",
    curiosity: "Curiosidade educativa para exibir quando o aluno responder."
}
```

O jogo selecionará aleatoriamente 10 perguntas desse arquivo a cada partida.

## 🎨 Como Trocar o Mascote e Cenário

As imagens do jogo estão na pasta `src/assets/images/`.
Para trocar os personagens ou cenários:
1. Substitua a imagem `mascote.png` pela sua nova arte do mascote. Mantenha o fundo transparente (formato PNG).
2. Substitua a imagem `background.png` pelo seu novo cenário. Recomendamos proporção widescreen (1920x1080).

**Nota**: O projeto baseia-se fortemente na paleta de cores alemã/brusquense e elementos como enxaimel. Você pode alterar as cores principais modificando as variáveis no topo do arquivo `src/css/style.css`.
