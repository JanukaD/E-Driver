// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "This signal indicates?",
        imgSrc : "img/Q1.png",
        choiceA : "Pedestrian crossing",
        choiceB : "Pedestrian crossing ahead",
        choiceC : "Pedestrian crossing passed",
        correct : "B"
    },{
        question : "This signal indicates?",
        imgSrc : "img/q2.png",
        choiceA : "Road allowed",
        choiceB : "Road closed ahead",
        choiceC : "Priority road",
        correct : "C"
    },{
        question : "This signal indicates?",
        imgSrc : "img/q3.png",
        choiceA : "Additional road connected",
        choiceB : "Duel carriageway end ahead",
        choiceC : "Narrow road ahead",
        correct : "B"
    },{
        question : "Parking block is?",
        imgSrc : "img/q4.jpg",
        choiceA : "Parking in a bus halt",
        choiceB : "Parking in a narrow bridge",
        choiceC : "Both above replies are correct",
        correct : "C"
    },{
        question : "When driving a vehicle driver should keep with him:",
        imgSrc : "img/g5.jpg",
        choiceA : "NIC and Driver's License",
        choiceB : "Driver's License",
        choiceC : "Driver's License, NIC, Reg. Book",
        correct : "C"
    },{
        question : "Which signal light indicates 'Get ready to go?'",
        imgSrc : "img/q6.jpg",
        choiceA : "Red with Amber",
        choiceB : "Amber light",
        choiceC : "Only the Green light",
        correct : "A"
    },{
        question : "Meaning of 02 white lines in the middle of the road?",
        imgSrc : "img/q7.jpg",
        choiceA : "Straggerd road",
        choiceB : "No turn right or overtake",
        choiceC : "Turn right",
        correct : "B"
    },{
        question : "Meaning of yellow colour line in the boarder?",
        imgSrc : "img/q8.jpg",
        choiceA : "Parking line",
        choiceB : "Parking if no blockade",
        choiceC : "No parking or limit of parking",
        correct : "C"
    },{
        question : "Correct way of reversing?",
        imgSrc : "img/q9.jpg",
        choiceA : "From sub road to main road",
        choiceB : "Form main road to sub road",
        choiceC : "Both",
        correct : "B"
    },{
        question : "This signal indicates?",
        imgSrc : "img/q10.png",
        choiceA : "Additional road connected",
        choiceB : "Priority to oncoming traffic",
        choiceC : "Priority to ongoing traffic",
        correct : "B"
    }
    
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















