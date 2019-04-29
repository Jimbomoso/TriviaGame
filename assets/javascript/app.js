//select elements

const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const counter = document.getElementById("counter");

const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const choiceD = document.getElementById("D");

// array of questions
let questions = [
  // question objects
  {
    question: "What is the question?",
    choiceA: "choice A",
    choiceB: "choice B",
    choiceC: "choice C",
    choiceD: "choice D",
    correct: "A"
  },

  {
    question: "What is question 2?",
    imgSrc: "img2.jpg",
    choiceA: "choice E",
    choiceB: "choice F",
    choiceC: "choice G",
    choiceD: "choice H",
    correct: "C"
  },
  {
    question: "What is question 3?",
    imgSrc: "img2.jpg",
    choiceA: "choice E",
    choiceB: "choice F",
    choiceC: "choice G",
    choiceD: "choice H",
    correct: "C"
  }
];

// main variables

let lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 10;
const questionTime = 0;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;


// ask question
function askQuestion(){
  let q = questions[runningQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.style.display = "none";
askQuestion();
quiz.style.display = "block";
renderCounter();
TIMER = setInterval(renderCounter, 1000);


// timer
function renderCounter() {
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

// score
function calcScore() {
  scoreDiv.style.display = "block";

  const scorePercent = Math.round(100* score/questions.length);

  scoreDiv.innerHTML = "<img src" + img +">";
  scoreDiv.innerHTML += "<p>" + scorePercent +"%</p>";
}
