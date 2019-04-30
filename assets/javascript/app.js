//select elements

const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const counter = document.getElementById("counter");

const scoreDiv = document.getElementById("scoreContainer");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

// array of questions
let questions = [
  // question objects
  {
    question: "How did Daenerys hatch her dragon eggs?",
    choiceA: "By keeping them warm",
    choiceB: "On a funeral pyre",
    choiceC: "By peeling them open",
    correct: "B"
  },

  {
    question: "What is question 2?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "B"
  },

  {
    question: "What is question 3?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "C"
  },
  
  {
    question: "What is the question 4?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "A"
  },

  {
    question: "What is question 5?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "B"
  },

  {
    question: "What is question 6?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "C"
  }
];

// main variables

let lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 6;
const questionTime = 0;
let TIMER;
let score = 0;
var drums = new Audio("drums.mp3");

// ask question
function askQuestion() {
  let q = questions[runningQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

$("#start").click(startGame);

// start function
function startGame() { 
start.style.display = "none";
askQuestion();
quiz.style.display = "block";
renderCounter();
TIMER = setInterval(renderCounter, 1000);
}

// end game
function endGame() {
question.innerHTML = "<p>" + "Gameover" + "</p>";
choices.style.display = "none";
timer.style.display = "none";
}


// counter
function renderCounter() {
  if(count > questionTime) {
    counter.innerHTML = count;
    count--
    drums.play();
  } else {
    counter.innerHTML = count;
    drums.pause();
    drums.currentTime = 0;
    runningQuestion++;
    checkAnswer();
  }
}

function checkAnswer(answer){
  if(answer === questions[runningQuestion].correct) {
    drums.pause();
    score++;
    calcScore();
    runningQuestion++;
    count = 6;
    renderCounter();
    askQuestion();
  } else if (runningQuestion < lastQuestion) {
    calcScore();
    runningQuestion++;
    count = 6;
    renderCounter();
    askQuestion();
  } else {
    endGame();
    clearInterval(TIMER);
    calcScore();
  }
}


// score
function calcScore() {
  scoreDiv.style.display = "block";

  $("#scoreContainer").empty();

  const scorePercent = Math.round(100* score/questions.length);

  scoreDiv.innerHTML += "<p>" + scorePercent +"%</p>";
}



