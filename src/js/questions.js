// Carrega as perguntas do JSON e disponibiliza como questionBank global
let questionBank = [];

async function loadQuestions() {
    const response = await fetch('src/data/perguntas.json');
    const data = await response.json();

    questionBank = data.map(q => ({
        id: q.id,
        question: q.pergunta,
        alternatives: q.respostas,
        correctAnswer: q.resposta_certa,
        curiosity: q.curiosidade,
        bgImage: q.bgImage
    }));
}
