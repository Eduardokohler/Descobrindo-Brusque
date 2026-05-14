// Estado do Jogo
const state = {
    player: {
        name: '',
        school: '',
        age: ''
    },
    level: '',
    timePerQuestion: 0,
    hasTip: false,
    tipUsed: false,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timerInterval: null,
    timeLeft: 0,
    soundMuted: false
};

// Audios (utilizando a Web Audio API ou synth objects)
const synth = window.speechSynthesis;
let currentUtterance = null;

// Efeitos Sonoros usando osciladores (para não depender de arquivos externos)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration) {
    if (state.soundMuted) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playCorrectSound() {
    playTone(600, 'sine', 0.1);
    setTimeout(() => playTone(800, 'sine', 0.2), 100);
}

function playWrongSound() {
    playTone(300, 'sawtooth', 0.3);
    setTimeout(() => playTone(200, 'sawtooth', 0.4), 150);
}

function playClickSound() {
    playTone(400, 'square', 0.1);
}

// Elementos da UI
const screens = {
    welcome: document.getElementById('screen-welcome'),
    difficulty: document.getElementById('screen-difficulty'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result'),
};

const modalFeedback = document.getElementById('modal-feedback');
const loginForm = document.getElementById('login-form');
const difficultyButtons = document.querySelectorAll('.difficulty-buttons .btn');
const btnMute = document.getElementById('btn-mute');

// Algoritmo Fisher-Yates para embaralhar
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Navegação de Telas
function showScreen(screenId) {
    Object.values(screens).forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });
    screens[screenId].classList.remove('hidden');
    screens[screenId].classList.add('active');
    
    // Restaura o fundo padrão fora do jogo
    if (screenId !== 'game') {
        document.body.style.backgroundImage = "url('src/assets/images/background.png')";
    }
}

// Inicialização: Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playClickSound();
    
    state.player.name = document.getElementById('player-name').value;
    state.player.school = document.getElementById('player-school').value;
    state.player.age = document.getElementById('player-age').value;
    
    if (state.player.name || state.player.school) {
        const playerData = {
            nome: state.player.name,
            escola: state.player.school,
            idade: state.player.age,
            ultimoAcesso: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('descobrindoBrusque.player', JSON.stringify(playerData));
    }
    
    if (!state.player.name) state.player.name = 'JOGADOR';
    
    showScreen('difficulty');
});

// Seleção de Dificuldade
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        playClickSound();
        const level = e.currentTarget.getAttribute('data-level');
        startGame(level);
    });
});

function startGame(level) {
    state.level = level;
    state.score = 0;
    state.currentQuestionIndex = 0;
    
    // Configurações por nível
    if (level === 'facil') {
        state.timePerQuestion = 30;
        state.hasTip = true;
    } else if (level === 'medio') {
        state.timePerQuestion = 20;
        state.hasTip = false;
    } else {
        state.timePerQuestion = 15;
        state.hasTip = false;
    }

    // Sortear 10 perguntas do banco
    const shuffledBank = shuffleArray(questionBank);
    state.questions = shuffledBank.slice(0, 10);
    
    const nameplate = document.getElementById('player-nameplate');
    const nameplateText = document.getElementById('nameplate-text');
    
    if (state.player.name && state.player.name !== 'JOGADOR') {
        let text = `🎒 ${state.player.name}`;
        if (state.player.school) {
            text += ` — ${state.player.school}`;
        }
        nameplateText.innerText = text;
        nameplate.classList.remove('hidden');
    } else {
        nameplate.classList.add('hidden');
    }
    
    showScreen('game');
    loadQuestion();
}

function loadQuestion() {
    state.tipUsed = false;
    const q = state.questions[state.currentQuestionIndex];
    
    // Altera o fundo para a imagem específica da pergunta com uma camada escura para legibilidade
    if (q.bgImage) {
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${q.bgImage}')`;
    }
    
    document.getElementById('progress-text').innerText = `PERGUNTA ${state.currentQuestionIndex + 1} DE 10`;
    document.getElementById('progress-bar-fill').style.width = `${((state.currentQuestionIndex + 1) / 10) * 100}%`;
    
    document.getElementById('question-text').innerText = q.question;
    
    const altContainer = document.getElementById('alternatives-container');
    altContainer.innerHTML = '';
    
    // Embaralhar alternativas
    const shuffledAlts = shuffleArray(q.alternatives);
    
    shuffledAlts.forEach((alt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-alt';
        btn.innerHTML = `<strong>${String.fromCharCode(65 + index)})</strong> ${alt}`;
        btn.addEventListener('click', () => handleAnswer(alt, btn));
        altContainer.appendChild(btn);
    });

    const tipBtn = document.getElementById('btn-tip');
    if (state.hasTip) {
        tipBtn.classList.remove('hidden');
        tipBtn.onclick = () => showTip(shuffledAlts, q.correctAnswer);
    } else {
        tipBtn.classList.add('hidden');
    }

    document.getElementById('time-left').innerText = state.timePerQuestion; // visual reset
    
    // Ler a pergunta e só depois iniciar o tempo
    if (!state.soundMuted) {
        speakText(q.question, () => {
            const buttons = document.querySelectorAll('.btn-alt');
            if (buttons.length > 0 && !buttons[0].disabled) {
                startTimer();
            }
        });
    } else {
        startTimer();
    }
}

function startTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = state.timePerQuestion;
    document.getElementById('time-left').innerText = state.timeLeft;
    
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('time-left').innerText = state.timeLeft;
        
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleAnswer(selectedAlt, buttonElement) {
    clearInterval(state.timerInterval);
    const q = state.questions[state.currentQuestionIndex];
    const isCorrect = selectedAlt === q.correctAnswer;
    
    const buttons = document.querySelectorAll('.btn-alt');
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        buttonElement.classList.add('correct');
        state.score++;
        playCorrectSound();
        createConfetti();
        showFeedback(true, q.curiosity);
    } else {
        buttonElement.classList.add('wrong');
        screens.game.classList.add('shake');
        setTimeout(() => screens.game.classList.remove('shake'), 500);
        playWrongSound();
        
        // Destacar a certa
        buttons.forEach(btn => {
            if (btn.innerText.includes(q.correctAnswer)) {
                btn.classList.add('correct');
            }
        });
        showFeedback(false, q.curiosity);
    }
}

function handleTimeout() {
    const q = state.questions[state.currentQuestionIndex];
    playWrongSound();
    if (!state.soundMuted) playAudioFile('src/assets/audio/timeout.mp3');
    const buttons = document.querySelectorAll('.btn-alt');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText.includes(q.correctAnswer)) {
            btn.classList.add('correct');
        }
    });
    showFeedback(false, q.curiosity);
}

function showTip(alts, correct) {
    if (state.tipUsed) return;
    state.tipUsed = true;
    document.getElementById('btn-tip').classList.add('hidden');
    
    const wrongAlts = alts.filter(a => a !== correct);
    const toRemove = shuffleArray(wrongAlts).slice(0, 2);
    
    const buttons = document.querySelectorAll('.btn-alt');
    buttons.forEach(btn => {
        toRemove.forEach(wrongText => {
            if (btn.innerText.includes(wrongText)) {
                btn.style.opacity = '0.3';
                btn.disabled = true;
            }
        });
    });
}

function showFeedback(isCorrect, curiosity) {
    modalFeedback.classList.remove('hidden');
    const title = document.getElementById('feedback-title');
    title.innerText = isCorrect ? "ACERTOU!" : "ERROU!";
    title.style.color = isCorrect ? "var(--color-correct)" : "var(--color-wrong)";
    
    document.getElementById('feedback-curiosity').innerText = curiosity;
    
    if (!state.soundMuted) {
        const file = isCorrect ? 'src/assets/audio/acertou.mp3' : 'src/assets/audio/errou.mp3';
        playAudioFile(file);
    }
}

document.getElementById('btn-next-question').addEventListener('click', () => {
    playClickSound();
    modalFeedback.classList.add('hidden');
    synth.cancel();
    
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < 10) {
        loadQuestion();
    } else {
        endGame();
    }
});

function endGame() {
    showScreen('result');
    document.getElementById('result-player-name').innerText = `${state.player.name}, SEU RESULTADO:`;
    document.getElementById('final-score').innerText = state.score;
    
    let msg = "";
    if (state.score === 10) msg = "PERFEITO! VOCÊ É UM EXPERT EM BRUSQUE!";
    else if (state.score >= 7) msg = "MUITO BEM! VOCÊ CONHECE MUITO DA NOSSA CIDADE!";
    else if (state.score >= 4) msg = "BOM ESFORÇO! MAS PODEMOS APRENDER MAIS!";
    else msg = "NÃO DESANIME! JOGUE NOVAMENTE E APRENDA TUDO SOBRE BRUSQUE!";
    
    const resultMessage = document.getElementById('result-message');
    if (state.player.name && state.player.name !== 'JOGADOR') {
        let customText = `${state.player.name.toUpperCase()}`;
        if (state.player.school) customText += `, DA ${state.player.school.toUpperCase()},`;
        customText += ` É AGORA UMA EXPERT EM BRUSQUE!`;
        resultMessage.innerText = customText;
        document.getElementById('result-player-name').innerText = `SEU RESULTADO:`;
    } else {
        resultMessage.innerText = msg;
        document.getElementById('result-player-name').innerText = `SEU RESULTADO:`;
    }
    
    if (state.score >= 7) {
        createConfetti();
    }
}

document.getElementById('btn-play-again').addEventListener('click', () => {
    playClickSound();
    showScreen('welcome');
});

document.getElementById('btn-share').addEventListener('click', () => {
    alert(`Consegui ${state.score} pontos no jogo Descobrindo Brusque!`);
});

// Áudio: toca mp3 pré-gerado, com fallback para TTS
let currentAudio = null;

function stopAudio() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    synth.cancel();
}

function playAudioFile(file, onEndCallback) {
    stopAudio();
    const audio = new Audio(file);
    currentAudio = audio;
    audio.onended = () => { currentAudio = null; if (onEndCallback) onEndCallback(); };
    audio.onerror = () => { currentAudio = null; if (onEndCallback) onEndCallback(); };
    audio.play().catch(() => { if (onEndCallback) onEndCallback(); });
}

function speakText(text, onEndCallback) {
    if (state.soundMuted) {
        if (onEndCallback) onEndCallback();
        return;
    }

    // Mapeia texto para arquivo de áudio pré-gerado
    const q = state.questions[state.currentQuestionIndex];
    let audioFile = null;

    if (q && text === q.question) {
        audioFile = `src/assets/audio/q${q.id}.mp3`;
    } else if (text.includes('acertou') || text.includes('Muito bem')) {
        audioFile = 'src/assets/audio/acertou.mp3';
    } else if (text.includes('errou') || text.includes('pena')) {
        audioFile = 'src/assets/audio/errou.mp3';
    } else if (text.includes('tempo')) {
        audioFile = 'src/assets/audio/timeout.mp3';
    }

    if (audioFile) {
        playAudioFile(audioFile, onEndCallback);
    } else {
        // Fallback TTS
        synth.cancel();
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.lang = 'pt-BR';
        currentUtterance.rate = 0.9;
        if (onEndCallback) {
            currentUtterance.onend = onEndCallback;
            currentUtterance.onerror = onEndCallback;
        }
        synth.speak(currentUtterance);
    }
}

document.getElementById('btn-read-question').addEventListener('click', () => {
    const q = state.questions[state.currentQuestionIndex];
    speakText(q.question);
});

btnMute.addEventListener('click', () => {
    state.soundMuted = !state.soundMuted;
    btnMute.innerText = state.soundMuted ? '🔇' : '🔊';
    if (state.soundMuted) synth.cancel();
});

// Confetti Simples com DOM Elements
function createConfetti() {
    let container = document.getElementById('canvas-confetti');
    if (!container) {
        container = document.createElement('div');
        container.id = 'canvas-confetti';
        document.body.appendChild(container);
    }
    container.innerHTML = ''; // Limpar antigos
    
    const colors = ['#2E7D32', '#D32F2F', '#FBC02D', '#42A5F5', '#7B1FA2'];
    
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-10px';
        conf.style.opacity = Math.random() + 0.5;
        conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(conf);
        
        // Animação de queda manual rápida usando setTimeout e transitions
        setTimeout(() => {
            conf.style.transition = `top ${Math.random() * 2 + 1}s linear, left ${Math.random() * 2 + 1}s ease-in-out`;
            conf.style.top = '100vh';
            conf.style.left = (parseFloat(conf.style.left) + (Math.random() * 20 - 10)) + 'vw';
        }, 50);
    }
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

// Resgatar do LocalStorage ao abrir
window.onload = async () => {
    await loadQuestions();

    const savedData = localStorage.getItem('descobrindoBrusque.player');
    if (savedData) {
        try {
            const player = JSON.parse(savedData);
            document.getElementById('player-name').value = player.nome || '';
            document.getElementById('player-school').value = player.escola || '';
            document.getElementById('player-age').value = player.idade || '';
            
            if (player.nome) {
                const welcomeBubble = document.getElementById('welcome-speech-bubble');
                if (welcomeBubble) {
                    welcomeBubble.innerText = `OI DE NOVO, ${player.nome.toUpperCase()}! PRONTA PARA MAIS UMA AVENTURA POR BRUSQUE?`;
                }
                document.getElementById('btn-change-player').classList.remove('hidden');
            }
        } catch (e) {}
    }
};

document.getElementById('btn-change-player').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('descobrindoBrusque.player');
    document.getElementById('player-name').value = '';
    document.getElementById('player-school').value = '';
    document.getElementById('player-age').value = '';
    const welcomeBubble = document.getElementById('welcome-speech-bubble');
    if (welcomeBubble) {
        welcomeBubble.innerText = 'OI! EU SOU O QUACK, O MARRECO DE BRUSQUE! DIGITE SEU NOME AQUI 👇 OU SÓ CLIQUE EM JOGAR!';
    }
    document.getElementById('btn-change-player').classList.add('hidden');
});
