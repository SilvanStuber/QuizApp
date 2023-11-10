function init() {
  load();
  if (whichQuiz.length == 0) {
    document.getElementById('content').innerHTML = generateHomePage(); 
  } else {
    startQuiz(whichQuiz[0]); 
  }
}

function loadImpressum() {
  document.getElementById('content').innerHTML = generaterImpressum();
}

function startQuiz(questions) {
  document.getElementById('content').innerHTML = generaterQuizContent(questions);
  document.getElementById('all-questions').innerHTML = questions.length - 2; 
  document.getElementById('question-number').innerHTML = questions[0]['currentQuestion'] - 1; 
  showQuestion(questions);
  whichQuiz = [];
  whichQuiz.push(questions);
  save();
}

function showQuestion(questions) { 
  if (gameIsOver(questions)) { 
    showEndscreen(questions);
  } else { 
    updateToNextQuestion(questions);
  }
  updateProgressBar(questions);
  save();
}

function gameIsOver(questions) {
  return questions[0]['currentQuestion'] >= questions.length;
}

function updateToNextQuestion(questions) {
  let question = whichQuestion(questions);
  document.getElementById('questiontext').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar(questions) {
  let percent = Math.round(((questions[0]['currentQuestion'] - 2) / (questions.length - 2)) * 100); 
  document.getElementById('progress-bar').innerHTML = `${percent} %`;
  document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function showEndscreen(questions) {
  document.getElementById('content').innerHTML = ``;
  document.getElementById('content').innerHTML = generateEndScreen(questions);
  document.getElementById('amount-of-questions').innerHTML = questions.length - 2;
  document.getElementById('amount-of-right-questions').innerHTML = questions[1]['rightQuestion'];
}

function whichQuestion(questions) {
  let valueFromQuestion = questions[0]['currentQuestion']; 
  let question = questions[valueFromQuestion];
  return (question);
}

function answer(selection) {
  let nameOfTheQuiz = whichQuiz[0];
  let question = whichQuestion(whichQuiz[0]);
  let selectedQuestionNumber = selection.slice(-1); 
  let idOfRightAnswer = `answer_${question['right_answer']}`;
  if (rightAnswerSelected(selectedQuestionNumber, question)) { 
    document.getElementById(selection).parentNode.classList.add('bg-success'); 
    AUDIO_SUCCESS.play();
    nameOfTheQuiz[1]['rightQuestion']++; 
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); 
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
  }
  document.getElementById('next-button').disabled = false; 
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
  let nameOfTheQuiz = whichQuiz[0];
  nameOfTheQuiz[0]['currentQuestion']++; 
  document.getElementById('next-button').disabled = true; 
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

function resetAnswerButtons() { 
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
    <p class="home-page-secondline">Wähle deine Kategorie und starte das Abenteuer des Wissens!</p>
    <img class="home-page-logo" src="./img/homepagelogo.png" alt="homepagelogo">
  </div>
  `;
}

function generaterImpressum() {
  return /*html*/ `
      <div class="impressum">
      <h1 class="impressum-headline">Impressum</h1>
      <p>
        Silvan Stuber<br />
        Bernstrasse 46<br />
        3267 Seedorf
      </p>
      <h2 class="second-headline-impressum">Contact</h2>
      <a class="link-impressum" href="mailto:silvan.stuber1@gmail.com">E-Mail: silvan.stuber1@gmail.com</a>
      <h2 class="second-headline-impressum">The icons, images and sounds are from</h2>
      <a class="link-impressum" href="https://pixabay.com/" rel="nofollow" target="_blank">pixabay</a>
      <a class="link-impressum" href="https://www.pexels.com/" rel="nofollow" target="_blank">pexels</a>
      <a class="link-impressum" href="https://https://freesound.org//" rel="nofollow" target="_blank">freesound</a>
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
    <b>QUIZ</b>
    <b>KOMPLETT</b>
    <div class="your-score-container"><b class="your-score-text">DEINE PUNKTZAHL</b> <b id="amount-of-right-questions"></b> / <b id="amount-of-questions"></b></div>
    <button onclick="replayQuiz()" class="btn btn-primary quiz-button" type="submit">REPLAY</button>
</div>
  </div>
  `;
}