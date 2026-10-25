var questions = [
    
        
    {    question: "Which plant is commonly used in traditional Indian remedies?",
        options: ["Tulsi", "Rose", "Bamboo", "Fern"],
        answer: "Tulsi"
    },
    {
        question: "Which plant is traditionally used in dental care?",
        options: ["Neem", "Sunflower", "Lotus", "Jasmine"],
        answer: "Neem"
    },
    {
        question: "Which plant is famous for turning towards sunlight when young?",
        options: ["Cactus", "Sunflower", "Fern", "Moss"],
        answer: "Sunflower"
    },
   
    {
        question: "Which gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"],
        answer: "Carbon dioxide"
    },
    {
        question: "Which plant stores water in its thick stem?",
        options: ["Rose", "Cactus", "Tulsi", "Mint"],
        answer: "Cactus"
    },
    
   
    {
        question: "Which plant is known for its fragrant flowers?",
        options: ["Jasmine", "Cactus", "Neem", "Fern"],
        answer: "Jasmine"
    },
   
    {
        question: "Which plant is grown for its beautiful flowers?",
        options: ["Rose", "Grass", "Moss", "Fern"],
        answer: "Rose"
    },
   
   
   
   
    {
        question: "Which of these is a climbing plant?",
        options: ["Money plant", "Mango tree", "Neem tree", "Coconut tree"],
        answer: "Money plant"
    },
    {
        question: "Which plant is commonly used as a cooking herb?",
        options: ["Mint", "Cactus", "Pine", "Moss"],
        answer: "Mint"
    },
    {
        question: "What is the process by which plants make food?",
        options: ["Photosynthesis", "Digestion", "Germination", "Pollination"],
        answer: "Photosynthesis"
    },
    {
        question: "Which part of a seed develops into a new plant?",
        options: ["Embryo", "Seed coat", "Soil", "Petal"],
        answer: "Embryo"
    },
    {
        question: "Which plant is well adapted to desert conditions?",
        options: ["Cactus", "Lotus", "Rice", "Fern"],
        answer: "Cactus"
    },
    {
        question: "Which plant commonly grows in water gardens?",
        options: ["Lotus", "Neem", "Rosewood", "Cactus"],
        answer: "Lotus"
    },
   
   
   
    {
        question: "What is one main function of roots?",
        options: [
            "Absorb water and minerals",
            "Make flowers colourful",
            "Produce fruits directly",
            "Attract insects only"
        ],
        answer: "Absorb water and minerals"
    },
   
    {
        question: "Why are trees important for the environment?",
        options: [
            "They absorb carbon dioxide",
            "They create plastic",
            "They stop all rainfall",
            "They remove all oxygen"
        ],
        answer: "They absorb carbon dioxide"
    },
   
    
];

var currentQuestion = 0;
var score = 0;
var answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    
    document.body.classList.add("quiz-started");

    showQuestion();
}

function showQuestion() {
    answered = false;

    var q = questions[currentQuestion];

    updateProgress();

    var html = "<h2>Question " +
        (currentQuestion + 1) + " of " +
        questions.length + "</h2>";

    html += "<p>" + q.question + "</p>";

    for (var i = 0; i < q.options.length; i++) {
        html += "<button onclick='checkAnswer(" +
            i + ")'>" + q.options[i] + "</button> ";
    }

    html += "<p id='message'></p>";

    

    document.getElementById("quiz").innerHTML = html;
}

function checkAnswer(optionIndex) {
    if (answered) {
        return;
    }

    answered = true;

    var q = questions[currentQuestion];
    var selectedAnswer = q.options[optionIndex];
    var correctAnswer = q.answer;
    var message = document.getElementById("message");
    var buttons = document.querySelectorAll("#quiz button");

    if (selectedAnswer === correctAnswer) {
        score++;
        message.innerHTML = "Correct Answer! Well done!";
    } else {
        message.innerHTML =
            "Wrong Answer! Correct answer: " + correctAnswer;
    }

    for (var i = 0; i < q.options.length; i++) {
        buttons[i].disabled = true;

        if (q.options[i] === correctAnswer) {
            buttons[i].style.backgroundColor = "green";
        }
    }

    if (selectedAnswer !== correctAnswer) {
        buttons[optionIndex].style.backgroundColor = "red";
    }

    setTimeout(function() {
        nextQuestion();
    }, 500);
}


function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    var percentage = Math.round((score / questions.length) * 100);

    var html = "<h2>Quiz Completed!</h2>";

    html += "<h3>Your Score: " + score +
        " out of " + questions.length + "</h3>";

    html += "<p>Your Result: " + percentage + "%</p>";

    if (percentage >= 80) {
        html += "<p>Excellent! You know a lot about plants!</p>";
    } else if (percentage >= 50) {
        html += "<p>Good job! Keep learning about plants!</p>";
    } else {
        html += "<p>Keep practising! You can do better!</p>";
    }

    html += "<button onclick='startQuiz()'>Play Again</button>";

    document.getElementById("quiz").innerHTML = html;
}

function updateProgress() {
    var progress = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";
}