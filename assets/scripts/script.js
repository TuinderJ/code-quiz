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
  if (question === undefined) {return gameOver();}
  const h2 = document.createElement('h2');
  h2.textContent = question.question;
  
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('question-screen');
  contentContainer.classList.add('flex');
  
  const numberOfQuestions = question.multipleChoice.length;
  for (i = 0; i < numberOfQuestions; i++) {
    const button = document.createElement('button');
    let currentOption = question.multipleChoice.splice(Math.floor(Math.random() * question.multipleChoice.length), 1);
    if (currentOption == question.answer) {indexOfCorrectAnswer = i;};
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
  let count = 0;
  let keys = [];
  for (let key of Object.entries(questions)) {
    keys.push(key[0]);
    count++
  }
  let index = keys[Math.floor(Math.random() * count)];
  let question = questions[index];
  delete(questions[index]);
  return question;
}

function checkAnswer(e) {
  const target = e.target;
  if (target.tagName.toLowerCase() !== 'button') {return}
  choseCorrectAnswer = (target === main.children[1].children[indexOfCorrectAnswer]);
  newQuestion();
}

function gameOver() {
  // results screen
}



init();