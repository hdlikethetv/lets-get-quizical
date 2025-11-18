// Get references to the different screens
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('results-screen');

// Get start page element references
const startButton = document.getElementById('start-btn');
const usernameInput = document.getElementById('username-input');


// Get quiz page element references
const usernameDisplay = document.getElementById('display-username');

// Event Listeners
startButton.addEventListener('click', startQuiz);

// Function to show a specific screen and hide the others
function showScreen(screen) {
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');     // Hide alll
    resultScreen.classList.add('hidden');

    // Show the selected screen
    if (screen === 'start') {
        startScreen.classList.remove('hidden');
    } else if (screen === 'quiz') {
        quizScreen.classList.remove('hidden');
    } else if (screen === 'results') {
        resultScreen.classList.remove('hidden');
    }
}

showScreen('start'); // Show the start screen by default

function startQuiz() {
    const enteredName = usernameInput.value.trim(); // Remove whitespace and set name
    if (!enteredName) {
        alert('Please enter your name to start the quiz.');
        return;
    }

    if (enteredName.length < 3) {
        alert('Name must be at least 3 characters long.');
        return;
    }

    
    usernameDisplay.textContent = enteredName;
    showScreen('quiz');
}

