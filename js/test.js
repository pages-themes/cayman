// global vars
var attemptTime = 0;  // seconds elapsed during attempt
var totalTime = getTestTotalTime();  // seconds elapsed during all test
var attemptNumber = getTestAttemptNumber() + 1;
var questions = null;

function abortTest() {
    if (confirm("Are you sure you want to abort the test?")) {
        purgeTest();
        document.location.href = "/";
    }
}

function displayTimer() {
    attemptTime += 1;
    document.getElementById("attemptTimer")
        .innerHTML = getMMSSString(attemptTime);

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
    questions = getTestQuestions();
    var testCanvasHtml = "<form>";  // start form
    for (var i = 0; i < questions.length; i++) {
        testCanvasHtml += "<h2>Question #" + (i + 1) + "</h2>";
        testCanvasHtml += "<h3 id='q_" + i + "'>" + questions[i]["q"] + "</h3>";
        var answers = questions[i]["a"];
        for (var j = 0; j < answers.length; j++) {
            testCanvasHtml += "<input type='radio' id='a_" + i + "_" + j + "' name='group" + i + "' value='" + answers[j] + "'>  " + answers[j] + "<br>";
        }

        testCanvasHtml += "<br>";
        testCanvasHtml += "<br>";
    }
    testCanvasHtml += "<br><br><input type='button' value='Submit' onclick='submitTestAttempt()'></form>";
    return testCanvasHtml;
}

function populatePage() {
    document.getElementById("attemptCounter").innerHTML = attemptNumber;
    document.getElementById("test-canvas").innerHTML = getTestCanvas();
}

function loadPage() {
    if (isTestRunning() || isTestSubmit()) {
        populatePage();
        setStatusRunning();
    } else {
        showErrorLoadingTest();
    }
}

function checkAnswers() {
    var numWrongAnswers = 0;

    for (var i = 0; i < questions.length; i++) {
        for (var j = 0; j < questions[i]["a"].length; j++) {
            var selectedAnswer = document.getElementById("a_" + i + "_" + j);
            if (
                selectedAnswer.value === questions[i]["c"] && !selectedAnswer.checked  // right answer not checked
            ) {
                numWrongAnswers += 1;
            }
        }
    }

    return numWrongAnswers;
}

function showTimeWait(numWrongAnswers) {
    var timeBeforeNextAttempt = getTimeBetweenAttempts();
    document.getElementById("test-canvas").innerHTML = "There" +
        " are " + numWrongAnswers + " errors. Please, wait " + timeBeforeNextAttempt + " seconds" +
        " before next attempt.";
    setTimeout(function() {
        window.location.reload(true)
    }, 1000 * timeBeforeNextAttempt);
}

function endTest() {
    setStatusFinished();
    document.getElementById("test-canvas").innerHTML = "Simply wonderful!" +
        " You made it! Please, wait a few moments ...";
    setTimeout(function() {
        window.location.href = "finish.html"
    }, 1000 * 3);  // 3 seconds
}

function submitTestAttempt() {
    setStatusSubmit();
    addTimeToTotal(attemptTime + getTimeBetweenAttempts());  // log attempt time
    logAttempt();

    var numWrongAnswers = checkAnswers();
    if (numWrongAnswers === 0) {
        endTest();
    } else {
        showTimeWait(numWrongAnswers);
    }
}

loadPage();
setInterval(displayTimer, 1000);  // repeat this function each second
