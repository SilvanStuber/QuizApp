function init() {
  load()
  document.getElementById('content').innerHTML = generateHomePage();
}

function startQuiz(i) {
  let questions = i;
  document.getElementById('content').innerHTML = generaterQuizContent(questions);
  document.getElementById('all-questions').innerHTML = questions.length - 1;
  showQuestion(questions);
  whichQuiz = [];
  whichQuiz.push(questions);
  save();
}

function showQuestion(questions) {
  
  let question = whichQuestion(questions);
  document.getElementById('questiontext').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function whichQuestion(questions) {
  let valueFromQuestion = questions[0]['currentQuestion'];
  let question = questions[valueFromQuestion];
  return (question);
}

function answer(selection) {
  let questions = whichQuiz;
  let question = whichQuestion(questions[0]);
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question['right_answer']}`;
  if (selectedQuestionNumber == question['right_answer']) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
  }
  document.getElementById('next-button').disabled = false; 
}

function save() {
  let whichQuizAtText = JSON.stringify(whichQuiz);
  localStorage.setItem('whichquiz', whichQuizAtText);
}

function load() {
  let whichQuizAtText = localStorage.getItem('whichquiz');
  if (whichQuizAtText) {
    whichQuiz = JSON.parse(whichQuizAtText);
  }
}

function generateHomePage() {
  return /*html*/ `
  <img class="home-page-background" src="./img/bg.png" alt="bg">
  `;
}

function generaterQuizContent() {
  return /*html*/ `
  <div class="card-body answer-container">
    <h5 class="card-title p-3" id="questiontext"></h5>
    <div onclick="answer('answer_1')" class="card mt-4 answer-card">
      <div class="card-body answer-content">
        <div class="letter-card">
          <b>A</b>
        </div>
        <b id="answer_1"></b>
      </div>
    </div>
    <div onclick="answer('answer_2')" class="card mt-4 answer-card">
      <div class="card-body answer-content">
        <div class="letter-card">
          <b>B</b>
        </div>
        <b id="answer_2"></b>
      </div>
    </div>
    <div onclick="answer('answer_3')" class="card mt-4 answer-card">
      <div class="card-body answer-content">
        <div class="letter-card">
          <b>C</b>
        </div>
        <b id="answer_3"></b>
      </div>
    </div>
    <div onclick="answer('answer_4')" class="card mt-4 answer-card">
      <div class="card-body answer-content">
        <div class="letter-card">
          <b>D</b>
        </div>
        <b id="answer_4"></b>
      </div>
    </div>
  </div>
<div class="footer-card">
   <div class="quiz-counter"><b>1</b> von <b id="all-questions">5</b> Fragen</div>
   <button class="btn btn-primary quiz-button" type="submit" id="next-button" disabled>Nächste Frage</button>
</div>
  `;
}