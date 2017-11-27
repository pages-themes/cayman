function abortTest() {
    if (confirm("Are you sure you want to abort the test?")) {
        setStatusFinished();
        purgeTest();
        document.location.href = "/";
    }
}

function showErrorLoadingTest() {
    var out = "Sorry .. it seems that you've not created the test yet!";
    out += "\nPlease, head over <a href='new.html'>here</a> to create a new" +
        " one!";
    document.getElementById("test-canvas").innerHTML = out;


    document.getElementById("testHeader").innerHTML = "<section class=\"page-header\">\n" +
        "<h1 class=\"project-name\" align=\"center\">Ooops! Test not found!</h1>\n" +
        "</section>";

    $(".main-content").removeClass("test-content");
}

function getTestCanvas() {
    var testCanvasHtml = "<form>";  // start form
    var questions = getTestQuestions();
    for (var i = 0; i < questions.length; i++) {
        testCanvasHtml += "<h2>Question #" + (i + 1) + "</h2>";
        testCanvasHtml += "<h3>" + questions[i]["q"] + "</h3>";
        var answers = questions[i]["a"];
        for (var j = 0; j < answers.length; j++) {
            testCanvasHtml += "<input type='radio' name='group" + i + "' value=' + " + j + "'>  " + answers[j] + "<br>";
        }

        testCanvasHtml += "<br>";
        testCanvasHtml += "<br>";
    }
    testCanvasHtml += "</form>";  // close form TODO: add submit button
    return testCanvasHtml;
}

function populatePage() {
    document.getElementById("attemptCounter").innerHTML = getTestAttemptNumber();
    document.getElementById("totalTimer").innerHTML = getTestTotalTime();
    document.getElementById("test-canvas").innerHTML = getTestCanvas();
}

function loadPage() {
    if (isTestRunning()) {
        populatePage();
    } else {
        showErrorLoadingTest();
    }
}

loadPage();
