// global vars
var attemptTime = 0;  // seconds elapsed during attempt
var totalTime = getTestTotalTime();  // seconds elapsed during all test
var attemptNumber = getTestAttemptNumber() + 1;
var questions = null;
var currentQuestionIndex = -1;
var answers = [];

function abortTest() {
    if (confirm("Are you sure you want to abort the test?")) {
        purgeTest();
        document.location.href = "/";
    }
}

function displayTimer() {
    attemptTime += 1;
    document.getElementById("totalTimer")
        .innerHTML = getMMSSString(totalTime + attemptTime);
}

function showErrorLoadingTest() {
    var out = "Sorry .. it seems that you've not created the test yet!";
    out += " Please, head over <a href='new.html'>here</a> to create a new" +
        " one!";
    document.getElementById("test-canvas").innerHTML = out;


    document.getElementById("testHeader").innerHTML = "<section class=\"page-header\">\n" +
        "<h1 class=\"project-name\" align=\"center\">Ooops! Test not found!</h1>\n" +
        "</section>";

    $(".main-content").removeClass("test-content");
}

function getTestCanvas() {
    var testCanvasHtml = "<form id='questionsForm'>";  // start form
    testCanvasHtml += "<h2>Question #" + (currentQuestionIndex + 1) + "</h2>";
    testCanvasHtml += "<img id='image" + currentQuestionIndex + "' src=''>";
    testCanvasHtml += "<h3>" + questions[currentQuestionIndex]["q"] + "</h3>";
    var answers = questions[currentQuestionIndex]["a"];
    for (var j = 0; j < answers.length; j++) {
        if (answers[j].length > 0) {
            testCanvasHtml += "<input type='radio'" +
                " name='group" + currentQuestionIndex + "' value='" + answers[j] + "'>  " + answers[j] + "<br>";
        }
    }

    // next, prev buttons
    testCanvasHtml += "<input style='margin-top: 8em;' type='button'" +
        " value='Submit'" +
        " onclick='submitTestAttempt()'></form>";
    testCanvasHtml += "<br><br>" +
        "<div style='margin-top: -8em;'>\n" +
        "        <button style=\"float: left;\"" +
        " onclick=\"goToPrevQuestion()\">Previous\n" +
        "        </button>\n" +
        "        <button style=\"float: right;\" onclick=\"goToNextQuestion()\">Next</button>\n" +
        "    </div><br><br>";

    return testCanvasHtml;
}

function setupTest() {
    questions = getTestQuestions();
    currentQuestionIndex = 0;
    for (var i = 0; i < questions.length; i++) {
        answers.push("not right");
    }
}

function populatePage() {
    document.getElementById("test-canvas").innerHTML = getTestCanvas();
    displayImageFromStorage("image" + currentQuestionIndex, "imageData" + currentQuestionIndex);
    loadAnswer();
}

function saveAnswer() {
    var formOptions = $("#questionsForm").find("input");
    for (var i = 0; i < formOptions.length; i++) {
        if (formOptions[i].checked) {
            answers[currentQuestionIndex] = formOptions[i].value;
        }
    }
}

function loadAnswer() {
    var formOptions = $("#questionsForm").find("input");
    var hasAlreadyAnswered = false;
    for (var i = 0; i < formOptions.length; i++) {
        if (formOptions[i].value === answers[currentQuestionIndex]) {
            formOptions[i].checked = true;
            hasAlreadyAnswered = true;
        }
    }

    if (hasAlreadyAnswered) {
        for (var i = 0; i < formOptions.length; i++) {
            formOptions[i].disabled = "disabled";
        }
    }
}

function goToPrevQuestion() {
    if (currentQuestionIndex > 0) {
        saveAnswer();
        currentQuestionIndex -= 1;
        populatePage();
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        saveAnswer();
        currentQuestionIndex += 1;
        populatePage();
    }
}

function loadPage() {
    if (isTestRunning() || isTestSubmit()) {
        setupTest();
        populatePage();
        setStatusRunning();
    } else {
        showErrorLoadingTest();
    }
}

function checkAnswers() {
    var numWrongAnswers = 0;

    for (var i = 0; i < questions.length; i++) {
        if (!(answers[i] == questions[i]["c"])) {
            numWrongAnswers += 1;
        }
    }

    return numWrongAnswers;
}

function endTest(numWrongAnswers) {
    setStatusFinished();
    if (numWrongAnswers === 0) {
        document.getElementById("test-canvas").innerHTML = "Simply wonderful!" +
            " You made it! Please, wait a few moments ...";
    } else {
        document.getElementById("test-canvas").innerHTML = "Ooops!" +
            " You made " + numWrongAnswers + " errors! -.-";
    }

    setTimeout(function() {
        window.location.href = "finish.html"
    }, 1000 * 3);  // 3 seconds
}

function submitTestAttempt() {
    saveAnswer();
    setStatusSubmit();
    addTimeToTotal(attemptTime);  // log attempt time
    logAttempt();
    logAnswers(answers);
    endTest(checkAnswers());
}

loadPage();
setInterval(displayTimer, 1000);  // repeat this function each second

function displayImageFromStorage(imageId, storageId) {
    var image = document.getElementById(imageId);
    var imageData = localStorage.getItem(storageId);
    if (imageData != null) {
        image.src = atob(imageData);
    }

}
