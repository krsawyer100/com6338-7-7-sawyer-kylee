var questionsArr = [
    {
      question: 'What is the proper term for a group of kittens?',
      answer: 'Kindle',
      options: [
        'Kettle',
        'Kaboodle',
        'Kine',
        'Kindle',
      ]
    },
    {
        question: 'All cats are born with what color eyes?',
        answer: 'Blue',
        options: [
          'Blue',
          'Green',
          'Black',
          'Pink',
        ]
      },
      {
        question: 'What is it called when a cat kneads to ground?',
        answer: 'Snurgling',
        options: [
          'Snurgling',
          'Kneading',
          'Sneegling',
          'Rubbing',
        ]
      },
      {
        question: 'How many different sounds can a cat make?',
        answer: '100',
        options: [
          '27',
          '150',
          '10',
          '100',
        ]
      },
      {
        question: 'How many breeds of domestic cat are there worldwide?',
        answer: '70',
        options: [
          '210',
          '70',
          '140',
          '280',
        ]
      },
      {
        question: 'What skill do cats develop when playing with yarn/toys?',
        answer: 'Hunting',
        options: [
          'Hunting',
          'Socializing',
          'Mating',
          'Finding Food',
        ]
      },
      {
        question: 'What breed of cat has no tail?',
        answer: 'Manx',
        options: [
          'Manx',
          'Singapura',
          'Snowshoe',
          'La Perm',
        ]
      },
      {
        question: 'What breed of domestic cat has the longest fur?',
        answer: 'Persian',
        options: [
          'Sphynx',
          'Persian',
          'Tonkinese',
          'Himalayan',
        ]
      },
      {
        question: 'Which country has more cats per person than any other country in the world?',
        answer: 'New Zealand',
        options: [
          'New Zealand',
          'Djibouti',
          'Denmark',
          'United States',
        ]
      },
      {
        question: 'What is the largest breed of cat?',
        answer: 'Maine Coon',
        options: [
          'Ragdoll',
          'British Shorthair',
          'Savannah',
          'Maine Coon',
        ]
      },
  ]

var quizContainer = document.getElementById('quiz')
var quizOptions = document.createElement('div')

var question = ''
question = document.createElement('p')

//create a start quiz btn with start-quiz id
var startBtn = document.createElement('button')
startBtn.id = 'start-quiz'
startBtn.textContent = 'Start Quiz'

var timer
var secondsLeft = document.createElement('p')

var questionNum = 0
var numCorrect = 0

var score = ''
score = document.createElement('p')

var previousScore

document.body.onload = function() {
    //show previous test score if taken before
    previousScore = localStorage.getItem('previous-score')
    if (previousScore !== null) {
        score.textContent = 'Previous Score: ' + previousScore + '%'
        quizContainer.appendChild(score)
        quizContainer.appendChild(startBtn)
    } else 
        quizContainer.appendChild(startBtn)
}

//When quiz btn show first question
startBtn.onclick = function() {
    if (score.textContent) {
        quizContainer.removeChild(score)
        quizContainer.removeChild(startBtn)
        nextQuestion()
    } else {
        quizContainer.removeChild(startBtn)
        nextQuestion()
    }
}

function nextQuestion() {
    if (questionNum < questionsArr.length) {
        startTimer()
        if (!question === '') {
            quizContainer.removeChild(question)
        }
        quizOptions.innerHTML = ''
        question.textContent = questionsArr[questionNum].question;
        quizContainer.appendChild(question)
        //buttons for answer options
        for (var i = 0; i < 4; i++) {
            var options = document.createElement('button')
            options.textContent = questionsArr[questionNum].options[i];
            var answer = questionsArr[questionNum].answer
            if (options.textContent === answer) {
                options.onclick = function() {
                    numCorrect ++
                    nextQuestion()
                }
            } else {
                options.onclick = function() {
                    nextQuestion()
                }
            }
            quizOptions.appendChild(options)
            quizContainer.appendChild(quizOptions)
            quizContainer.appendChild(secondsLeft)
        }
        questionNum ++
    } else {
        clearInterval(timer)
        previousScore = Math.floor(Number(numCorrect/questionsArr.length) * 100)
        score.textContent = 'Previous Score: ' + previousScore + '%'
        //store test scores in local storage
        localStorage.setItem('previous-score', previousScore)
        quizContainer.innerHTML = ''
        //after last question show start quiz button and previous score
        quizContainer.appendChild(score)
        quizContainer.appendChild(startBtn)
        questionNum = 0
        numCorrect = 0
    }
}

function startTimer() {
    //restart timer when question is answered before it run out
    if (timer) {
        clearInterval(timer)
    }
    if (quizContainer.contains(secondsLeft))
        quizContainer.removeChild(secondsLeft)
    //timer for 30 seconds
    secondsLeft.textContent = '30'
    timer = setInterval(function() {
        var seconds = Number(secondsLeft.textContent) - 1
        //move to the next question and mark it wrong if they don't answer the question in time
        if (seconds === -1) {
            clearInterval(timer)
            nextQuestion()
        } else {
            secondsLeft.textContent = seconds
        }
    }, 1000)
}
