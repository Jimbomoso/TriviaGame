//select elements

const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const counter = document.getElementById("counter");

const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

// array of questions
let questions = [
  // question objects
  {
    question: "What is the question?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    correct: "A"
  },

  {
    question: "What is question 2?",
    choiceA: "choice E",
    choiceB: "choice F",
    choiceC: "choice G",
    correct: "C"
  },
  
  {
    question: "What is question 3?",
    choiceA: "choice E",
    choiceB: "choice F",
    choiceC: "choice G",
    correct: "C"
  }
];

// main variables

let lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 5;
const questionTime = 0;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;

var drums = new Audio("drums.mp3.mp3");



// ask question
function askQuestion(){
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


// timer
function renderCounter() {
  drums.play();
  if(count >= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count--
  } else {
    count = 0;
    answerIsWrong();
    if(runningQuestion < lastQuestion) {
      runningQuestion++;
      askQuestion();
    } else {
      clearInterval(TIMER);
      calcScore();
    }
  }
}

function checkAnswer(answer){
  if(answer === questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if(runningQuestion < lastQuestion) {
    runningQuestion++;
    askQuestion();
  } else {
    clearInterval(TIMER);
    calcScore();
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "blue";
}

// score
function calcScore() {
  scoreDiv.style.display = "block";

  const scorePercent = Math.round(100* score/questions.length);

  scoreDiv.innerHTML += "<p>" + scorePercent +"%</p>";
}



