var defaultTimeRemaining = 75;
var timeRemaining = defaultTimeRemaining;
var currentQuestion = 0;
var theCounter;
var questions = [
    { 
        question: 'What\'s the difference between triple and double equal?',
        answers: [
            'There is no difference',
            'Double checks type',
            'Triple checks type',
            'Triple does not exist',
        ],
        answer: 2,
    },
    { 
        question: 'Is null type object?',
        answers: [
            'yes',
            'no',
        ],
        answer: 0,
    },
    { 
        question: 'Who was the first president?',
        answers: [
            'George Washington',
            'Mila Kunis',
            'Miranda Cosgrove',
            'Starbucks',
        ],
        answer: 0,
    },
    { 
        question: 'Which game can you play on Battle.Net?',
        answers: [
            'World of Warcraft',
            'League of Legends',
            'Guild Wars',
            'The Elder Scrolls',
        ],
        answer: 0,
    },
    { 
        question: 'What is the highest-grossing arcade game of all time?',
        answers: [
            'Space Invaders',
            'Pacman',
            'Donkey Kong',
            'Mario Bros',
        ],
        answer: 1,
    },
    { 
        question: 'Who is the protagonist in Legends of Zelda?',
        answers: [
            'Justin Timberlake',
            'Ganondorf',
            'Zelda',
            'Link',
        ],
        answer: 3,
    },
    { 
        question: 'What is the best-selling video game console of all time that sold over 155 million consoles worldwide?',
        answers: [
            'Nintendo GameCube',
            'PlayStation 2',
            'Xbox',
            'SNES'
        ],
        answer: 1,
    },
    { 
        question: 'Who was the moscot of Sega?',
        answers: [
            'Tails',
            'Mario',
            'Sonic',
            'Plumbus'
        ],
        answer: 1,
    },
    { 
        question: 'What female video game character would eventually be portrayed by Angelina Jolie in a movie??',
        answers: [
            'Cortana',
            'Chun-Li',
            'Lara Croft',
            'Bayonetta'
        ],
        answer: 2,
    },
    
];

function renderQuestion() {
    var div = document.querySelector('#current-question');
    var question = questions[currentQuestion];
    var buttons = question.answers.map(function (answer, index) {
        return `<button type="button" onclick="selectAnswer(${index})">${answer}</button>`;
    });
    var content = `
        <div class="question">${question.question}</div>
        <div class="answers">
            ${buttons.join('')}
        </div>

    `;
    div.innerHTML = content;
    
}

function endQuiz() {
    if (theCounter) {
        clearTimeout(theCounter);
    }
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    document.querySelector("#final-score").innerText = timeRemaining;
    document.querySelector('#quiz').classList.add('hidden');
    document.querySelector('#name').classList.remove('hidden');
}

function countDown() {
    document.querySelector("#time-remaining").innerText = timeRemaining;
    timeRemaining--;
    if (timeRemaining <= 0) {
        endQuiz();
        return;
    } 
    theCounter = setTimeout(countDown, 1000);
}


function startQuiz() {
    currentQuestion = 0;
    timeRemaining = defaultTimeRemaining;
    document.querySelector('#landing').classList.add('hidden');
    document.querySelector('#quiz').classList.remove('hidden');
    countDown();
    renderQuestion();
}


function nextQuestion() {
    if (currentQuestion === questions.length - 1) {
        endQuiz(); 
    } else {
        currentQuestion++;
        renderQuestion();
    }
}

function selectAnswer(answer) {
    var question = questions[currentQuestion];
    if (answer === question.answer) {
        nextQuestion();
    }
    else {
        timeRemaining = timeRemaining - 15;
        nextQuestion();
    }
}

function setInitials() {
    var input = document.querySelector('#initials').value;
    if (input) {
        document.querySelector('#initial-save').removeAttribute('disabled');
    } else {
        document.querySelector('#initial-save').setAttribute('disabled', "");
    }
}

function saveInitials() {
    var input = document.querySelector('#initials').value;
    if (input) {
        var currentStorage = JSON.parse(localStorage.getItem('quizHighScore') || '{}');
        currentStorage[input] = timeRemaining;
        localStorage.setItem('quizHighScore', JSON.stringify(currentStorage));
        window.location.assign('highscores.html')
    } 
    
} 