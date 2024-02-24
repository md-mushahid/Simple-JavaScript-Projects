const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "if a = 4 and b = 3 find square of (a+b)?",
        answers:[
            {text: "16", correct: false},
            {text: "49", correct: true},
            {text: "9", correct: false},
            {text: "12", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Bangladesh", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: false},
            {text: "Vatican City", correct: true},
        ]
    },
    {
        question: "'two four two four' which one is correct?",
        answers:[
            {text: "4444", correct: false},
            {text: "2444", correct: false},
            {text: "2424", correct: true},
            {text: "4424", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);

    questionElement.innerHTML = `${currentQuestionIndex+1}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
         selectedBtn.classList.add("incorrect");
        // alert("you are a dum")   
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();