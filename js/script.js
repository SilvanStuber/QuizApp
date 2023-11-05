function init() {
  load()
  document.getElementById('content').innerHTML = generateHomePage();
}

function startQuiz(i) {
  let questions  = i;  
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
  document.getElementById('answer1').innerHTML = question['answer_1'];
  document.getElementById('answer2').innerHTML = question['answer_2'];
  document.getElementById('answer3').innerHTML = question['answer_3'];
  document.getElementById('answer4').innerHTML = question['answer_4'];
}

function whichQuestion(questions) {
  let valueFromQuestion = questions[0]['currentQuestion'];
  let question = questions[valueFromQuestion];
  return(question);
}

function answer(selection) {
  let questions = whichQuiz;
  let question = whichQuestion(questions[0]);
  let selectedQuestionNumber = selection.slice(-1); //just the last letter from the variable
  if (selectedQuestionNumber == question['right_answer']) {
    console.log('Richtige Antwort')
  } else {
    console.log('Falsche Antwort')
  }
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
              <div class="card mt-4 answer-card">
                <div onclick="answer('answer_1')" class="card-body answer-content">
                  <div class="letter-card">
                    <b>A</b>
                  </div>
                  <div>
                    <b id="answer1"></b>
                  </div>
                </div>
              </div>
              <div onclick="answer('answer_2')" class="card mt-4 answer-card">
                <div class="card-body answer-content">
                  <div class="letter-card">
                    <b>B</b>
                  </div>
                  <b id="answer2"></b>
                </div>
              </div>
              <div onclick="answer('answer_3')" class="card mt-4 answer-card">
                <div class="card-body answer-content">
                  <div class="letter-card">
                    <b>C</b>
                  </div>
                  <b id="answer3"></b>
                </div>
              </div>
              <div onclick="answer('answer_4')" class="card mt-4 answer-card">
                <div class="card-body answer-content">
                  <div class="letter-card">
                    <b>D</b>
                  </div>
                  <b id="answer4"></b>
                </div>
              </div>
            </div>
            <div class="footer-card">
              <img class="arrow" src="./img/arrowleft.png" alt="arrowleft." />
              <div>
                <b>1</b> von <b id="all-questions">5</b> Fragen
              </div>
              <img class="arrow" src="./img/arrowright.png" alt="arrowright" />
            </div>
  `;
}