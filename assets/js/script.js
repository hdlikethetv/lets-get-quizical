// Get references to the different screens

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('results-screen');

// Function to show a specific screen and hide the others
function showScreen(screen) {
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');

    if (screen === 'start') {
        startScreen.classList.remove('hidden');
    } else if (screen === 'quiz') {
        quizScreen.classList.remove('hidden');
    } else if (screen === 'results') {
        resultScreen.classList.remove('hidden');
    }
}

showScreen('start'); // Show the start screen by default