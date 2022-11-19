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