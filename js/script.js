// Define quiz object with quiz data and DOM elements
var quiz = {
    data: [
        {
            q: "What is the purpose of using flexbox in CSS?",
            o: [
              "To create flexible layouts",
              "To create animations",
              "To add images to a webpage",
              "To manipulate text styles",
            ],
            a: 0,
          },
          {
            q: "What is the default direction of a flex container?",
            o: ["Vertical", "Horizontal", "Diagonal", "None of the above"],
            a: 1,
          },
          {
            q: "Which property is used to specify the size of a flex item?",
            o: ["flex-grow", "flex-shrink", "flex-basis", "flex-wrap"],
            a: 2,
          },
          {
            q: "What is the difference between justify-content and align-items in flexbox?",
            o: [
              "justify-content aligns items horizontally, while align-items aligns them vertically",
              "justify-content aligns items vertically, while align-items aligns them horizontally",
              "There is no difference between the two",
              "justify-content and align-items both control the same aspect of flexbox",
            ],
            a: 0,
          },
          {
            q: "Which value of flex-wrap property specifies that flex items should be wrapped to multiple lines if there isn't enough space on one line?",
            o: ["nowrap", "wrap", "wrap-reverse", "inherit"],
            a: 1,
          },
          {
            q: "What is the difference between CSS grid and flexbox?",
            o: [
              "CSS grid is used for one-dimensional layouts, while flexbox is used for two-dimensional layouts",
              "CSS grid is used for two-dimensional layouts, while flexbox is used for one-dimensional layouts",
              "CSS grid and flexbox are the same thing",
              "CSS grid is only used for text layout, while flexbox is used for everything else",
            ],
            a: 1,
          },
          {
            q: "Which property is used to define the columns in a CSS grid?",
            o: [
              "grid-gap",
              "grid-template-rows",
              "grid-template-columns",
              "grid-template-areas",
            ],
            a: 2,
          },
          {
            q: "What is the purpose of the grid-template-areas property in CSS grid?",
            o: [
              "To define the number of rows in the grid",
              "To define the number of columns in the grid",
              "To create named grid areas",
              "To set the size of the grid",
            ],
            a: 2,
          },
          {
            q: "Which value of the grid-auto-flow property specifies that items should be placed in the grid in the order they appear in the HTML markup?",
            o: ["row", "column", "dense", "none"],
            a: 0,
          },
          {
            q: "What is the purpose of the grid-gap property in CSS grid?",
            o: [
              "To specify the size of the grid",
              "To create a gap between grid items",
              "To control the flow of items in the grid",
              "To set the background color of the grid",
            ],
            a: 1,
          },
          {
            q: "Which property is used to create a grid container?",
            o: [
              "grid-template",
              "grid-area",
              "grid-template-rows",
              "grid-template-columns",
            ],
            a: 0,
          },
    ],
    hWrap: null,
    hQn: null,
    hAns: null,
    now: 0,
    score: 0,
  };
  
  // Initialize the quiz by creating HTML elements and drawing the quiz
  function initQuiz(quiz) {
    quiz.hWrap = document.getElementById("quizWrap");
  
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);
  
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);
  
    drawQuiz(quiz);
  }
  
  // Draw the current quiz question and answer options
  function drawQuiz(quiz) {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        selectOption(quiz, label);
      });
      quiz.hAns.appendChild(label);
      
    }
  }
  
  // Handle the user's selection of a quiz option
  function selectOption(quiz, option) {
    // Remove event listeners from all quiz options
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", selectOption);
    }
  
    // Check if the selected option is correct
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
  
    // Move to the next quiz question or show the final result
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        drawQuiz(quiz);
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
         showResult();
        quiz.hAns.innerHTML = "";
      
      }
    }, 1000);
  }
  
  // Reset the quiz to its initial state
  function resetQuiz(quiz) {
    quiz.now = 0;
    quiz.score = 0;
    drawQuiz(quiz);
  }
  
  // Show the quiz result with a message about whether the user passed or failed
  function showResult() {
    let passingScore = Math.ceil(quiz.data.length / 2);
    let resultDiv = document.createElement("div");
    resultDiv.id = "resultDiv";
    quiz.hWrap.appendChild(resultDiv); 
    if (quiz.score < passingScore) {
        resultDiv.classList.add("failed")
      resultDiv.innerHTML = `<p>You scored ${quiz.score} out of ${quiz.data.length}, which is less than half of the questions. You need to score at least ${passingScore} to pass. A review is needed.</p>`;
    } else {
        resultDiv.classList.add("pass")
      resultDiv.innerHTML = `<p>Congratulations! You scored ${quiz.score} out of ${quiz.data.length} and passed the quiz.</p>`;
    }
    // if (quiz.score < passingScore) {
    //   resultDiv.innerHTML = `<p>You scored ${quiz.score} out of ${quiz.data.length}, which is less than half of the questions. You need to score at least ${passingScore} to pass. A review is needed.</p>`;
    // }
  }

  window.onload = function () {
    initQuiz(quiz);
    
  };