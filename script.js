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
var questionsPerPage = 2;
var answeredQuestions = [];

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answeredQuestions = [];

    document.querySelector(".welcome-section").hidden = true;
    document.querySelector(".learning-section").hidden = true;
    document.querySelector(".quiz-section").hidden = false;

    document.getElementById("result").innerHTML = "";
    document.getElementById("home-button").hidden = true;

    showQuestions();
}

function showQuestions() {
    var html = "";
    var endQuestion = Math.min(
        currentQuestion + questionsPerPage,
        questions.length
    );

    for (var i = currentQuestion; i < endQuestion; i++) {
        html += "<div class='question-card'>";
        html += "<h3>Question " + (i + 1) + " of " + questions.length + "</h3>";
        html += "<p>" + questions[i].question + "</p>";

        for (var j = 0; j < questions[i].options.length; j++) {
            html += "<label class='option' id='option-" + i + "-" + j + "'>";
            html += "<input type='radio' name='question-" + i +
                "' value='" + j + "' onchange='checkAnswer(" + i + "," + j + ")'>";
            html += " " + questions[i].options[j];
            html += "</label>";
        }

        html += "<p id='feedback-" + i + "' class='answer-feedback'></p>";
        html += "</div>";
    }

    document.getElementById("quiz").innerHTML = html;

    var progress = (currentQuestion / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    var nextButton = document.getElementById("next-button");
    nextButton.hidden = false;
    nextButton.innerHTML =
        endQuestion >= questions.length ? "Submit Quiz" : "Next Questions →";
}

function checkAnswer(questionIndex, optionIndex) {
    if (answeredQuestions[questionIndex]) {
        return;
    }

    answeredQuestions[questionIndex] = true;

    var question = questions[questionIndex];
    var selectedAnswer = question.options[optionIndex];
    var correctIndex = question.options.indexOf(question.answer);

    var correctLabel = document.getElementById(
        "option-" + questionIndex + "-" + correctIndex
    );

    var selectedLabel = document.getElementById(
        "option-" + questionIndex + "-" + optionIndex
    );

    var feedback = document.getElementById("feedback-" + questionIndex);

    if (selectedAnswer === question.answer) {
        score++;
        selectedLabel.classList.add("correct");
        feedback.innerHTML = " Correct Answer!";
        feedback.style.color = "green";
    } else {
        selectedLabel.classList.add("wrong");
        correctLabel.classList.add("correct");
        feedback.innerHTML = " Wrong Answer!";
        feedback.style.color = "red";
    }

    var radios = document.querySelectorAll(
        "input[name='question-" + questionIndex + "']"
    );

    radios.forEach(function(radio) {
        radio.disabled = true;
    });
}

function nextQuestions() {
    var endQuestion = Math.min(
        currentQuestion + questionsPerPage,
        questions.length
    );

    for (var i = currentQuestion; i < endQuestion; i++) {
        if (!answeredQuestions[i]) {
            alert("Please answer Question " + (i + 1) + " first!");
            return;
        }
    }

    if (endQuestion >= questions.length) {
        showResult();
    } else {
        currentQuestion = endQuestion;
        showQuestions();
        window.scrollTo(0, 0);
    }
}

function showResult() {
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("next-button").hidden = true;
    document.getElementById("progress-bar").style.width = "100%";

    var percentage = Math.round((score / questions.length) * 100);

    var html = "<h3>🎉 Quiz Completed!</h3>";
    html += "<p>Your Score: " + score + " out of " + questions.length + "</p>";
    html += "<p>Your Result: " + percentage + "%</p>";

    if (percentage >= 80) {
        html += "<p>Excellent! You know a lot about plants! 🌿</p>";
    } else if (percentage >= 50) {
        html += "<p>Good job! Keep learning about plants!</p>";
    } else {
        html += "<p>Keep practising! You can do better!</p>";
    }

    document.getElementById("result").innerHTML = html;
    document.getElementById("home-button").hidden = false;
}

function goHome() {
    document.querySelector(".welcome-section").hidden = false;
    document.querySelector(".learning-section").hidden = false;
    document.querySelector(".quiz-section").hidden = true;

    document.getElementById("quiz").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

