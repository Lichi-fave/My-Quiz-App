// quiz data for different subjects
const quizData = {
  python: [
    { q: "What is Python?", options: ["Snake", "Programming Language", "Game"], answer: 1 },
    { q: "Which keyword defines a function?", options: ["def", "func", "function"], answer: 0 },
    { q: "Which symbol is used for comments?", options: ["//", "#", "--"], answer: 1 },
    { q: "Python is ___ typed", options: ["Strongly", "Weakly", "No type"], answer: 0 },
    { q: "Which is a list?", options: ["{}", "[]", "()"], answer: 1 }
  ],

  javascript: [
    { q: "JS stands for?", options: ["Java Source", "JavaScript", "Just Script"], answer: 1 },
    { q: "Which keyword declares a variable?", options: ["let", "int", "varr"], answer: 0 },
    { q: "JS is ___ language", options: ["Compiled", "Interpreted", "None"], answer: 1 },
    { q: "Which symbol is used to comment?", options: ["//", "#", "<!--"], answer: 0 },
    { q: "Which is array?", options: ["{}", "[]", "()"], answer: 1 }
  ],

  maths: [
    { q: "2 + 2?", options: ["3", "4", "5"], answer: 1 },
    { q: "5 x 3?", options: ["15", "10", "8"], answer: 0 },
    { q: "Square of 4?", options: ["8", "16", "12"], answer: 1 },
    { q: "10 ÷ 2?", options: ["2", "5", "10"], answer: 1 },
    { q: "7 + 1?", options: ["6", "8", "9"], answer: 1 }
  ],

  english: [
    { q: "Opposite of 'Good'?", options: ["Bad", "Nice", "Fine"], answer: 0 },
    { q: "Plural of 'Book'?", options: ["Books", "Bookes", "Book"], answer: 0 },
    { q: "A verb is?", options: ["Action word", "Name", "Place"], answer: 0 },
    { q: "Synonym of 'Fast'?", options: ["Quick", "Slow", "Late"], answer: 0 },
    { q: "Past tense of 'Go'?", options: ["Goed", "Went", "Gone"], answer: 1 }
  ],

  french: [
    { q: "Bonjour means?", options: ["Hello", "Bye", "Thanks"], answer: 0 },
    { q: "Merci means?", options: ["Please", "Thanks", "Sorry"], answer: 1 },
    { q: "Oui means?", options: ["No", "Yes", "Maybe"], answer: 1 },
    { q: "Au revoir means?", options: ["Hello", "Goodbye", "Welcome"], answer: 1 },
    { q: "Non means?", options: ["Yes", "No", "Okay"], answer: 1 }
  ]
};

// define global variables
let selectedSubject = "";
let questions = [];
let current = 0;
let userAnswers = [];
let score = 0;
let timer;
let timeLeft = 30; 


// function to start the quiz
function startQuiz() {
  const username = document.getElementById("username").value;
  selectedSubject = document.getElementById("subject").value;

  if (!selectedSubject || !username) {
    alert("Please enter your name and select a subject");
    return;
  }

  questions = quizData[selectedSubject];
  userAnswers =new Array(questions.length).fill(null);


  document.getElementById("welcomeText").innerHTML = `Good luck, <b>${username}</b>!`;

  document.getElementById("loginScreen").style.display = "none";

  document.getElementById("quizScreen").style.display = "block";

  loadQuestion();
  startTimer();
}

// function to display current question and options
function loadQuestion() {
  let q = questions[current];

  document.getElementById("question").innerText = q.q;
  document.getElementById("progress").innerText = `Question ${current + 1} of ${questions.length}`;
  document.getElementById("progressBar").style.width = `${((current+1)/questions.length)*100}%`;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    let div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    // If user already selected an answer, highlight it
    if (userAnswers[current] === i) 
      div.classList.add("selected"); 

    div.onclick = () => selectAnswer(i);
    optionsDiv.appendChild(div);
  });
}

// function to handle answer selection
function selectAnswer(i) {
  userAnswers[current] = i;
  loadQuestion(); // refresh to highlight selected option
}

// functions to navigate between questions
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    loadQuestion();
  }
}

// function to start the timer
function startTimer() {
    timer = setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").innerText = 
        `${Math.floor(timeLeft/60)}:${String(timeLeft % 60).padStart(2, "0")}`;

        if (timeLeft <= 0) submitQuiz();
    }, 1000);
}


// function to submit the quiz and calculate score
function submitQuiz() {
  clearInterval(timer);
  score = questions.reduce((acc, q, i) => acc + (userAnswers[i] === q.answer ? 1: 0), 0);

  showResults();
}

 // function to display results and correct answers
function showResults() {
    
    document.getElementById("quizScreen").style.display="none";

    const div = document.getElementById("resultScreen");
    div.style.display = "block";

    let correct = score;
    let wrong = questions.length - score;
    
    let html = `
    <h2 class="result-title>Awesome!</h2> 
    <p clas="final-score">Final Score:${score}/${questions.length}</p>
    <h3>Detailed Review</h3>
    `;

  questions.forEach((q, i) => {
    const userAns = userAnswers[i];
    const correctAns = q.answer;

    html += `
      <div class="review-item ${userAns === correctAns ? "correct" : "wrong"}">
        <p class="review-question">${i+1}. ${q.question}</p>
        <p class="review-answer"><b>Your Answer:</b> ${
          userAns !== null? q.options[userAns] : "Not answered"}</p>
        <p class="review-answer><b>Correct Answer:</b> ${q.options[correctAns]}</p>
      </div>
    `;
  });
   
    html += `
     <div class="results-buttons"> 
      <button onclick="location.reload()">Restart Quiz</button>
       <button onclick="goHome()"Return to Dashboard</button>
     </div>
    `;
      
    div.innerHTML = html;
}

function goHome() {
    location.reload();
}

