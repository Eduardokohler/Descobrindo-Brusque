# Descobrindo Brusque

Um jogo educativo em formato de quiz interativo para ensinar crianças (6 a 12 anos) sobre a história e cultura da cidade de Brusque – SC.

Projeto desenvolvido em parceria com a UNIFEBE e a Prefeitura Municipal de Brusque – Curso de Sistemas de Informação – 2026.

## 🛠️ Tecnologias Utilizadas

- HTML5, CSS3, JavaScript (Vanilla)
- Python (geração de áudios)
- [edge-tts](https://github.com/rany2/edge-tts) — vozes neurais Microsoft Edge (pt-BR)
- Web Audio API — efeitos sonoros de acerto/erro
- GitHub Pages — hospedagem

## 👥 Integrantes do Projeto

- Caio Muller Dalprá
- Eduardo Kohler
- Felipe de Almeida Waldrigues
- Lucas Baptista
- Vinicius Imhof Waldrigues

## 🚀 Como Rodar o Jogo

O jogo usa tecnologias web nativas e não requer instalação de dependências ou servidor.

1. Clone o repositório ou extraia os arquivos.
2. Abra o `index.html` no navegador (Chrome, Edge, Firefox).
3. Para desenvolvimento, use a extensão *Live Server* do VSCode para evitar bloqueios de CORS ao carregar o JSON e os áudios.

> O jogo também está disponível online via GitHub Pages.

## 📝 Como Adicionar ou Editar Perguntas

As perguntas ficam em `src/data/perguntas.json`. Basta editar o arquivo seguindo o formato:

```json
{
  "id": 16,
  "pergunta": "SUA PERGUNTA AQUI",
  "respostas": ["OPÇÃO 1", "OPÇÃO 2", "OPÇÃO 3", "OPÇÃO 4"],
  "resposta_certa": "OPÇÃO 1",
  "curiosidade": "Curiosidade educativa exibida após a resposta.",
  "bgImage": "src/assets/images/bg_q1.png"
}
```

O arquivo `src/js/questions.js` carrega o JSON automaticamente e converte para o formato do jogo.

## 🔊 Como Regenerar os Áudios

Os áudios das perguntas ficam em `src/assets/audio/` e são gerados com a voz neural `pt-BR-AntonioNeural` (masculina).

Para regenerar após editar as perguntas:

```bash
pip install edge-tts
python generate_audio_edge.py
```

Os arquivos gerados são: `q1.mp3` ... `q15.mp3`, `acertou.mp3`, `errou.mp3`, `timeout.mp3`.

## 🎨 Como Alterar Imagens

As imagens ficam em `src/assets/images/`.

- `mascote.png` — mascote do jogo (PNG com fundo transparente)
- `background.png` — fundo da tela inicial
- `bg_q1.png` ... `bg_q15.png` — fundos de cada pergunta
