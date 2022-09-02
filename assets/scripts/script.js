const main = document.querySelector('main');
let indexOfCorrectAnswer;
let choseCorrectAnswer;
let resultDelay = '';
let questions;

function init() {
  displayFirstScreen();
}

function displayFirstScreen() {
  main.innerHTML = '';
  main.dataset.state = 'start';
  
  const h1 = document.createElement('h1');
  h1.textContent = 'Code Quiz Challenge';
  
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('start-screen');
  contentContainer.classList.add('flex');
  
  const p = document.createElement('p');
  p.textContent = 'Try to answer the following coding questions. If you get one right, you get a point. If you get one wrong, you get time taken away. How high of a score can you get?';
  contentContainer.appendChild(p);

  const button = document.createElement('button');
  button.id = 'start-quiz';
  button.textContent = 'Start Quiz';
  contentContainer.appendChild(button);
  
  main.appendChild(h1);
  main.appendChild(contentContainer);

  button.addEventListener('click', startQuiz);
}

function startQuiz() {
  // start timer
  questions = questionsMasterList;
  newQuestion();
}

function newQuestion() {
  main.innerHTML = '';
  main.dataset.state = 'question';

  let question = getRandomQuestion();
  if (question.length === 0) {return gameOver();}
  const h2 = document.createElement('h2');
  h2.textContent = question[0].question;
  
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('question-screen');
  contentContainer.classList.add('flex');
  
  for (i = 0; i < question[0].multipleChoice.length;) {
    const button = document.createElement('button');
    let currentOption = question[0].multipleChoice.splice(Math.floor(Math.random() * question[0].multipleChoice.length), 1);
    if (currentOption == question[0].answer) {indexOfCorrectAnswer = i;};
    button.textContent = i + 1 + '. ' + currentOption;
    contentContainer.appendChild(button);
  }
  
  main.appendChild(h2);
  main.appendChild(contentContainer);

  contentContainer.addEventListener('click', checkAnswer);
  
  const result = document.createElement('div');
  result.classList.add('result');
  if (choseCorrectAnswer) {
    // add to score
    result.textContent = 'Correct!!';
  } else if (choseCorrectAnswer === false) {
    // deduct time
    result.textContent = 'Wrong!';
  };
  if (choseCorrectAnswer !== undefined) {
    main.appendChild(result)
    resultDelay = setTimeout( () => {
      result.remove();
    }, 1000);
  }
}

function getRandomQuestion() {
  return questions.splice(Math.floor(Math.random() * questions.length), 1);
}

function checkAnswer(e) {
  const target = e.target;
  if (target.tagName.toLowerCase() !== 'button') {return}
  choseCorrectAnswer = (target === main.children[1].children[indexOfCorrectAnswer]);
  newQuestion();
}

function gameOver() {
  // results screen
  main.innerHTML = '';
  main.dataset.state = 'result';

}



init();