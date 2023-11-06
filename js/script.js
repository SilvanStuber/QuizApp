function init() {
  load();
  document.getElementById('content').innerHTML = generateHomePage(); //load start screen
}

function startQuiz(questions) {
  document.getElementById('content').innerHTML = generaterQuizContent(questions);
  document.getElementById('all-questions').innerHTML = questions.length - 1; //generates the number of questions based on the quiz
  document.getElementById('question-number').innerHTML = questions[0]['currentQuestion']; //generates the value of the current question
  showQuestion(questions);
  whichQuiz = [];
  whichQuiz.push(questions);
  save();
}

function showQuestion(questions) { //loads the corresponding quiz
  let question = whichQuestion(questions);
  if (questions[0]['currentQuestion'] >= questions.length) { //value of the question has the length of the array
    document.getElementById('content').innerHTML = ``;//clear the content
    questions[0]['currentQuestion'] = [1]; //sets the value of the question to 1
  } else { //if the value of the question is less than the length of the array load question and answer
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
  }
  save();
}

function whichQuestion(questions) {
  let valueFromQuestion = questions[0]['currentQuestion']; //defines which quiz and the corresponding question
  let question = questions[valueFromQuestion];
  return (question);
}

function answer(selection) {
  let question = whichQuestion(whichQuiz[0]);
  let selectedQuestionNumber = selection.slice(-1); //take the last digit from the string
  let idOfRightAnswer = `answer_${question['right_answer']}`;
  if (selectedQuestionNumber == question['right_answer']) { //compare whether the clicked answer matches the correct one 
    document.getElementById(selection).parentNode.classList.add('bg-success'); //colours the field green
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); //colours the field red
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
  }
  document.getElementById('next-button').disabled = false; //makes the button unclickable
}

function nextQuestion() {
  let question = whichQuiz[0];
  question[0]['currentQuestion']++; //value of the question from the corresponding quiz is increased
  document.getElementById('next-button').disabled = true; //makes the button clickable
  resetAnswerButtons();
  startQuiz(question);
  save();
}

function resetAnswerButtons() { //removes the colouring of the field
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_1').parentNode.classList.remove('bg-success');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function save() {
  let whichQuizAtText = JSON.stringify(whichQuiz);
  let questsionsElectronicsAtText = JSON.stringify(questsionsElectronics);
  let questsionsBiologyAtText = JSON.stringify(questsionsBiology);
  let questsionsAnimalsAtText = JSON.stringify(questsionsAnimals);
  let questsionsGeologyAtText = JSON.stringify(questsionsGeology);
  localStorage.setItem('whichquiz', whichQuizAtText);
  localStorage.setItem('questsionselectronics', questsionsElectronicsAtText);
  localStorage.setItem('questsionsbiology', questsionsBiologyAtText);
  localStorage.setItem('questsionsanimals', questsionsAnimalsAtText);
  localStorage.setItem('questsionsgeology', questsionsGeologyAtText);
}

function load() {
  let whichQuizAtText = localStorage.getItem('whichquiz');
  let questsionsElectronicsAtText = localStorage.getItem('questsionselectronics');
  let questsionsBiologyAtText = localStorage.getItem('questsionsbiology');
  let questsionsAnimalsAtText = localStorage.getItem('questsionsanimals');
  let questsionsGeologyAtText = localStorage.getItem('questsionsgeology');
  if (whichQuizAtText && questsionsElectronicsAtText && questsionsBiologyAtText && questsionsAnimalsAtText && questsionsGeologyAtText) {
    whichQuiz = JSON.parse(whichQuizAtText);
    questsionsElectronics = JSON.parse(questsionsElectronicsAtText);
    questsionsBiology = JSON.parse(questsionsBiologyAtText);
    questsionsAnimals = JSON.parse(questsionsAnimalsAtText);
    questsionsGeology = JSON.parse(questsionsGeologyAtText);
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
   <div class="quiz-counter"><b id="question-number"></b> von <b id="all-questions"></b> Fragen</div>
   <button onclick="nextQuestion()" class="btn btn-primary quiz-button" type="submit" id="next-button" disabled>Nächste Frage</button>
</div>
  `;
}