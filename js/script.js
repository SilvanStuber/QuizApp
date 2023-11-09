function init() {
  load();
  if (whichQuiz.length == 0) {
    document.getElementById('content').innerHTML = generateHomePage(); //load start screen
  } else { 
    startQuiz(whichQuiz[0]); //load quiz
  }
}

function startQuiz(questions) {
  document.getElementById('content').innerHTML = generaterQuizContent(questions);
  document.getElementById('all-questions').innerHTML = questions.length - 2; //generates the number of questions based on the quiz
  document.getElementById('question-number').innerHTML = questions[0]['currentQuestion'] - 1; //generates the value of the current question
  showQuestion(questions);
  whichQuiz = [];
  whichQuiz.push(questions);
  save();
}

function showQuestion(questions) { //loads the corresponding quiz
  if (questions[0]['currentQuestion'] >= questions.length) { //value of the question has the length of the array
    document.getElementById('content').innerHTML = ``;//clear the content
    document.getElementById('content').innerHTML = generateEndScreen(questions);
    document.getElementById('amount-of-questions').innerHTML = questions.length - 2;
    document.getElementById('amount-of-right-questions').innerHTML = questions[1]['rightQuestion'];
  } else { //if the value of the question is less than the length of the array load question and answer
    let percent = Math.round(((questions[0]['currentQuestion'] - 1) / (questions.length -2)) * 100); //calculates the progress in percent
    document.getElementById('progress-bar').innerHTML = `${percent} %`;//changes the value in percent
    document.getElementById('progress-bar').style = `width: ${percent}%`;//changes the optical progress
    let question = whichQuestion(questions);
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
  let nameOfTheQuiz = whichQuiz[0];
  let question = whichQuestion(whichQuiz[0]);
  let selectedQuestionNumber = selection.slice(-1); //take the last digit from the string
  let idOfRightAnswer = `answer_${question['right_answer']}`;
  if (selectedQuestionNumber == question['right_answer']) { //compare whether the clicked answer matches the correct one 
    document.getElementById(selection).parentNode.classList.add('bg-success'); //colours the field green
    AUDIO_SUCCESS.play();
    nameOfTheQuiz[1]['rightQuestion']++; //increases the number of correct questions
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); //colours the field red
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
  }
  document.getElementById('next-button').disabled = false; //makes the button unclickable
}

function nextQuestion() {
  let nameOfTheQuiz = whichQuiz[0];
  nameOfTheQuiz[0]['currentQuestion']++; //value of the question from the corresponding quiz is increased
  document.getElementById('next-button').disabled = true; //makes the button clickable
  resetAnswerButtons();
  startQuiz(nameOfTheQuiz);
  save();
}

function replayQuiz() {
  let nameOfTheQuiz = whichQuiz[0];
  nameOfTheQuiz[0]['currentQuestion'] = 2;
  nameOfTheQuiz[1]['rightQuestion'] = 0;
  whichQuiz = [];
  save();
  init();
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
  <div class="home-page-container">
    <h1 class="home-page-headline">Willkommen beim Quiz App</h1>
    <p class="home-page-secondline"> Wähle deine Kategorie und starte das Abenteuer des Wissens!</p>
    <img class="home-page-logo" src="./img/homepagelogo.png" alt="homepagelogo">
  </div>
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

function generateEndScreen() {
  return /*html*/ `
  <div class="endscreen-container">
    <img  class="endscreen-background-img" src="./img/endscreen.png" alt="">
    <b>COMPLETE</b>
    <b> QUIZ</b>
    <div class="your-score-container"><b class="your-score-text">YOUR SCORE</b> <b id="amount-of-right-questions"></b> / <b id="amount-of-questions"></b></div>
    <button onclick="replayQuiz()" class="btn btn-primary quiz-button" type="submit">REPLAY</button>
</div>
  </div>
  `;
}