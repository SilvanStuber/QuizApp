function init() {

}

function startQuiz(i) {
  let questions  = i;           
  document.getElementById('all-questions').innerHTML = questions.length - 1;
  showQuestion(questions);
}

function showQuestion(questions) {
  let current = questions[0]['currentQuestion'];
  let question = questions[current];
  document.getElementById('questiontext').innerHTML = question['question']; 
  document.getElementById('answer1').innerHTML = question['answer_1'];
  document.getElementById('answer2').innerHTML = question['answer_2'];
  document.getElementById('answer3').innerHTML = question['answer_3'];
  document.getElementById('answer4').innerHTML = question['answer_4'];
}