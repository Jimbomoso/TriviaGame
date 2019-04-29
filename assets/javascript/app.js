(function() {
  function buildQuiz() {
    // place to store the HTML output
    const output = [];

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
      //store the list of answer choices
      const answers = [];

      // for each answer
      for (letter in currentQuestion.answers) {
        // add radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // combine our output list into string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "In the Disney film Pinocchio, what is the name of the giant whale?",
      answers: {
        a: "Figaro",
        b: "Mangiafuoco",
        c: "Monstro"
      },
      correctAnswer: "a"
    },

    {
        question: "What is the most abundant chemical element in the Universe?",
        answers: {
          a: "Oxygen",
          b: "Hydrogen",
          c: "Nitrogen"
      },
      correctAnswer: "b"
    },
    {
        question: "What countries soliders guard the Pope?",
        answers: {
          a: "Switzerland",
          b: "Italy",
          c: "France",
        },
        correctAnswer: "a"
    },
    ];

  // display quiz
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();