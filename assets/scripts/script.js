const main = document.querySelector('main');
const timeRemainingDisplay = document.getElementById('time-remaining');
let indexOfCorrectAnswer;
let choseCorrectAnswer;
let resultDelay;
let questions;
let score = 0;
let timer;
let countDown = '';

function init() {
  document.getElementById('view-highscores').addEventListener('click', displayHighScores);
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
  startTimer();
  questions = JSON.parse(sessionStorage.getItem('list'));
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
  
  const numberOfQuestions = question[0].multipleChoice.length;
  for (i = 0; i < numberOfQuestions; i++) {
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
  if (choseCorrectAnswer) {
    score++;
  } else {
    if (timer <= 5) {
      timer = 0;
      return gameOver();
    } else {
      timer = timer - 5;
      timeRemainingDisplay.textContent = timer;
    }
  }
  newQuestion();
}

function gameOver() {
  stopTimer();
  timeRemainingDisplay.textContent = timer;
  main.innerHTML = '';
  main.dataset.state = 'score';

  const h1 = document.createElement('h1');
  h1.textContent = 'Score';

  const div = document.createElement('div');
  div.id = 'score';
  div.textContent = score;
  choseCorrectAnswer = undefined;
  
  const form = document.createElement('form');
  form.classList.add('flex');
  const button = document.createElement('button');
  if (score > 0) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new-score-name';
    input.placeholder = 'Initals for Highscore Board...';
    button.id = 'score-button';
    button.textContent = 'Submit Score';
    button.addEventListener('click', newHighscore);
    form.appendChild(input);
  } else {
    button.id = 'view-highscores';
    button.textContent = 'View Highscores'
    button.addEventListener('click', displayHighScores);
  }
  form.appendChild(button);
  
  main.appendChild(h1);
  main.appendChild(div);
  main.appendChild(form);
  
}

function newHighscore(e) {
  e.preventDefault();
  const input = document.getElementById('new-score-name');
  if (input.value === '') {return alert('Initials cannot be left blank.')}
  let highscores = JSON.parse(localStorage.getItem('Highscores'));
  let newScore = { name: input.value, score: score};
  score = 0;
  if (highscores === null) {
    highscores = [newScore];
  } else {
    highscores.push(newScore);
  }
  localStorage.setItem('Highscores', JSON.stringify(highscores));

  displayHighScores();
}

function displayHighScores(e) {
  if (e) {e.preventDefault();}
  stopTimer();
  main.innerHTML = '';
  main.dataset.state = 'highscores';
  let highscores = JSON.parse(localStorage.getItem('Highscores'));
  
  const h1 = document.createElement('h1');
  h1.textContent = 'Highscores'
  const ul = document.createElement('ul');
  ul.classList.add('highscores');
  ul.classList.add('flex');
  
  const div = document.createElement('div');
  div.classList.add('flex');
  div.style.gap = '.5rem';
  const homeButton = document.createElement('button');
  homeButton.textContent = 'Go Back';
  homeButton.addEventListener('click', init);
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear Highscores';
  clearButton.addEventListener('click', clearHighscores);

  div.appendChild(homeButton);
  div.appendChild(clearButton);

  main.appendChild(h1);
  main.appendChild(ul);
  main.appendChild(div);
  if (highscores === null) {return};
  do {
    let highest = {score: 0};
    let indexOfHighestScore;
    for (let i = 0; i < highscores.length; i++) {
      if (highscores[i].score > highest.score) {
        highest = highscores[i];
        indexOfHighestScore = i;
      };
    };
    highscores.splice(indexOfHighestScore, 1);

    // render the highest score
    const li = document.createElement('li');
    li.classList.add('flex');
    const label = document.createElement('div');
    label.textContent = `${highest.name}:`;
    const value = document.createElement('div');
    value.textContent = highest.score;

    li.appendChild(label);
    li.appendChild(value);
    ul.appendChild(li);
  } while (highscores.length > 0);
}

function clearHighscores() {
  localStorage.clear();
  displayHighScores();
}

function startTimer() {
  if (countDown !== '') {return}
  timer = 60;
  timeRemainingDisplay.textContent = timer;
  countDown = setInterval(() => {
    timer--;
    if (timer <= 0) {
      gameOver();
    };
    timeRemainingDisplay.textContent = timer;
  }, 1000);
}

function stopTimer() {
  if (countDown === '') {return};
  clearInterval(countDown);
  countDown = '';
}

init();