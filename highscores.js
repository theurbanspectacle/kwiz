function setUp() {
    var currentStorage = JSON.parse(localStorage.getItem('quizHighScore') || '{}');
    var scores = Object.keys(currentStorage).map(function (key) {
        return `<div class="high-score-item">${key} - ${currentStorage[key]}</div>`;
    });
    document.querySelector('#highscores').innerHTML = scores.join('');
}

function goBack() {
    window.location.assign('index.html');
}

function clear() {
    localStorage.removeItem('quizHighScore');
    setUp();
}

setUp();