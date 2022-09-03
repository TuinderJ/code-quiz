let questionsMasterList = [
  {
    question: 'Which of the following is NOT a datatype in JavaScript?',
    multipleChoice: ['String', 'Boolean', 'Undefined', 'Integer'],
    answer: 'Integer'
  },
  {
    question: 'Which of the following is not a comparison operator?',
    multipleChoice: ['=', '>', '!=', '<='],
    answer: '='
  },
  {
    question: 'Which of the following is not a logical operator?',
    multipleChoice: ['&&', '||', '!', '=='],
    answer: '=='
  },
  {
    question: 'Whis of the following is not a way to declare a variable?',
    multipleChoice: ['var', 'let', 'const', 'dim'],
    answer: 'dim'
  },
  {
    question: 'To call the function initialize, I\'d write __________',
    multipleChoice: ['initialize();', 'initialize;', 'initialize(event)', 'call initialize();'],
    answer: 'initialize();'
  },
  {
    question: 'What should you start all .HTML files with?',
    multipleChoice: ['<!DOCTYPE html>', '<html>', '<head>', '<body>'],
    answer: '<!DOCTYPE html>'
  },
  {
    question: 'It\'s better to use === over == in most cases to prevent type confusion.',
    multipleChoice: ['True', 'False'],
    answer: 'True'
  },
]

sessionStorage.setItem('list', JSON.stringify(questionsMasterList));