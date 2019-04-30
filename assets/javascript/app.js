//select elements

const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const counter = document.getElementById("counter");

const scoreDiv = document.getElementById("scoreContainer");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const glow = document.getElementById("container");

// array of questions
let questions = [
  // question objects
  {
    question: "Where did Daenerys hatch her dragon eggs?",
    choiceA: "a nest",
    choiceB: "a funeral pyre",
    choiceC: "the sea",
    correct: "B"
  },

  {
    question: "Who is called the Illborn?",
    choiceA: "Joeffery Baratheon",
    choiceB: "Jon Snow",
    choiceC: "Theon Greyjoy",
    correct: "A"
  },

  {
    question: "At the end of season 2, Joffery sits on the Iron Throne, but who is the rightful king?",
    choiceA: "Stannis Baratheon",
    choiceB: "Jon Snow",
    choiceC: "Jamie Lannister",
    correct: "A"
  },
  
  {
    question: "How many fingertips were chopped off Davos' hand?",
    choiceA: "Three",
    choiceB: "Five",
    choiceC: "Four",
    correct: "C"
  },

  {
    question: "Which name is given to the bastards of The Westerlands?",
    choiceA: "Stone",
    choiceB: "Hill",
    choiceC: "Snow",
    correct: "B"
  },

  {
    question: "Who was king before Robert Baratheon?",
    choiceA: "Aerys Targaryan",
    choiceB: "Tywin Lannister",
    choiceC: "Eddard Stark",
    correct: "A"
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
var wine = new Audio("wine.wav");
var wrong = new Audio("wrong.wav");
var theme = new Audio("gameOfThrones.mp3");

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
glowing();
quiz.style.display = "block";
renderCounter();
TIMER = setInterval(renderCounter, 1000);
}

// end game
function endGame() {
drums.pause();
question.innerHTML = "<p>" + "Gameover" + "</p>";
question.style.fontSize = "100px";
choices.style.display = "none";
timer.style.display = "none";
theme.play();
}

function glowing() {
  setInterval(function() {
  $("#container").css("color", function() {
    this.switch =!this.switch
    return this.switch ? "#e25822" : ""
  }); 
}, 150)
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
    wine.play();
    score += 10;
    calcScore();
    runningQuestion++;
    count = 6;
    renderCounter();
    askQuestion();
  } else if (runningQuestion < lastQuestion) {
    wrong.play();
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

  // const scorePercent = Math.round(100* score/questions.length);

  scoreDiv.innerHTML += "<p>" + score +" points </p>";
}





