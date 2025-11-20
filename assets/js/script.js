// Get references to the different screens
const startScreen = document.getElementById('start-screen');
const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('results-screen');

// Get start page element references
const startButton = document.getElementById('start-btn');
const usernameInput = document.getElementById('username-input');
const userNameBtn = document.getElementById('username-btn');


// Get quiz page element references
const usernameDisplay = document.getElementById('display-username');
const questionContainer = document.getElementById('question-text');
const answersContainer = document.getElementById('answer-buttons');
const nextQuestionBtn = document.getElementById('next-btn');
const quizScore = document.getElementById('score');
const questionNumber = document.getElementById('question-number');


// Get result page element references
const resultUsername = document.getElementById('result-username');
const resultScore = document.getElementById('result-score');
const resultPercent = document.getElementById('result-percent');




//Global Variables
let currentQuestion = [];
let currentQuestionIndex;
let currentAnswers;
let currentCorrectAnswer;
let setName;
let score = 0;

// testing questions
let questions = [
  {
    type: 'text',
    question: 'What is the capital of Japan?',
    answers: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
    correctAnswer: 'Tokyo'
  },
  {
    type: 'text',
    question: 'True or false: Sharks have bones in their bodies',
    
    answers: ['True', 'False'],
    correctAnswer: 'False'
  },
  {
    type: 'text',
    question: 'Which planet is known as the Red Planet?',
    answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  }
];

// Event Listeners
startButton.addEventListener('click', startQuiz);
userNameBtn.addEventListener('click', showSelection);
nextQuestionBtn.addEventListener('click', () => {
    const nextIndex = currentQuestionIndex + 1;

    // Check if on last question
    if (nextIndex >= questions.length) {
        setResults();
        showScreen('results');
    } else {
        loadQuestion(nextIndex);
    }
});

// Function to show a specific screen and hide the others
function showScreen(screen) {
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');     // Hide alll
    resultScreen.classList.add('hidden');
    selectionScreen.classList.add('hidden');

    // Show the selected screen
    if (screen === 'start') {
        startScreen.classList.remove('hidden');
    } else if (screen === 'quiz') {
        quizScreen.classList.remove('hidden');
    } else if (screen === 'results') {
        resultScreen.classList.remove('hidden');
    } else if (screen === 'selection') {
         selectionScreen.classList.remove('hidden');
    }
}

// Function to start the quiz
function startQuiz() {
    
    showScreen('quiz');
    loadQuestion(0); // Load the first question
}

function showSelection() {
    const enteredName = usernameInput.value.trim(); // Remove whitespace and set name
    if (!enteredName) {
        alert('Please enter your name to start the quiz.');
        return;
    }

    if (enteredName.length < 3) {
        alert('Name must be at least 3 characters long.');
        return;
    }
    showScreen('selection');
    
    usernameDisplay.textContent = enteredName;
    setName = enteredName;

}

function loadQuestion(index) {
    currentQuestion = questions[index];
    currentQuestionIndex = index;
    currentAnswers = currentQuestion.answers;
    currentCorrectAnswer = currentQuestion.correctAnswer;

    console.log(currentQuestion);
    console.log(currentAnswers);
    console.log(currentCorrectAnswer);  

    nextQuestionBtn.classList.add('hidden'); // Hide the next question button if its visible
    questionNumber.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    questionContainer.textContent = currentQuestion.question;
    answersContainer.innerHTML = ''; // Clear previous answers if any
    currentCorrectAnswer = currentQuestion.correctAnswer;

    // loop through current question answers and create buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.classList.add('a-btn')
        answersContainer.appendChild(button);

        button.addEventListener('click', checkAnswer);
    });
}    

function checkAnswer(e) {
    const submittedAnswer = e.target.textContent;
    let selectedButton = e.target;
    let currentAnswerButtons = document.querySelectorAll('.answer-btn');
    console.log(e.target.textContent);

    if (!selectedButton.classList.contains('a-btn')) {
        return;
    }

    console.log("Button code ran");

    if (submittedAnswer === currentCorrectAnswer) {
        console.log("Correct");
        selectedButton.classList.add('correct');
        score = score + 1
        quizScore.textContent = score

    } else {
        console.log("Incorrect");
        selectedButton.classList.add('incorrect');

        
        console.log(currentAnswerButtons);

        currentAnswerButtons.forEach(button => {
        console.log(button);
        console.log(button.textContent);
        if (button.textContent.trim() === currentCorrectAnswer) {
        button.classList.add('correct');
        }
    });
    }
    currentAnswerButtons.forEach(button => {
        button.classList.remove("a-btn");
    });
    // Show next question button
    nextQuestionBtn.classList.remove('hidden');
}

function setResults() {

    resultUsername.textContent = setName;
    resultScore.textContent = score;
    resultPercent.textContent = Math.round(score / questions.length * 100) + '%'

}

async function getApiQuestions(amount = 30, difficulty = "easy") {
    const url = `https://opentdb.com/api.php?encode=url3986&amount=${amount}&difficulty=${difficulty}&category=9`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data || data.response_code !== 0) return; // return if api call failed.
    
    console.log(data.results);
    //Loops through the results array and returns a new sorted array of question objects
    const sortedQuestions = data.results.map(q => {
            const question = decodeURIComponent(q.question);
            const correct = decodeURIComponent(q.correct_answer);
            const incorrect = q.incorrect_answers.map(a => decodeURIComponent(a));
            let answers = decodeURIComponent(q.type) === 'boolean' ? ['True', 'False'] : [...incorrect, correct]; //  if the question is true or false set answers if not make a array from contents of incorrect array + correct answer
            return { type: 'text', question, answers, correctAnswer: correct };
    });

    console.log(sortedQuestions);
    questions = sortedQuestions;

}

showScreen('start'); // Show the start screen by default
getApiQuestions();
