function getTitle() {
    if (isTestFinished()) {
        return "Test completed!"
    }
    return "Sorry .. you've not completed the test yet!"
}

function getPageContent() {
    if (!isTestFinished()) {
        var out = "Sorry .. it seems that you've not created the test yet!";
        out += " Please, head over <a href='new.html'>here</a> to create a" +
            " new one!";
        return out;
    }

    var test = getLocalTest();
    var outHtml = "<h2>Summary of questions:</h2><ul>";
    for (var i = 0; i < test.length; i++) {
        outHtml +=
            "<li><h2>Question #" + (i + 1) + "</h2>\n" +
            "<p><b>Question: </b>" + test[i]["q"] + "</p>\n" +
            "<p><b>Correct answer: </b>" + test[i]["a"] + "</p>\n" +
            "<b>Other answers: </b><ul>";

        for (var j = 0; j < test[i]["o"].length; j++) {
            outHtml += "<li>" + test[i]["o"][j] + "</li>";
        }

        outHtml += "</ul></li>";
    }
    outHtml += "</ul><br><h2>Summary of attempts:</h2><br><ul>";
    var numAttempts = getTestAttemptNumber();
    var totalTimeAttempts = getTestTotalTime();
    var averageTimeAttempts = Math.round(totalTimeAttempts / numAttempts);

    outHtml += "<li># attempts: " + numAttempts + "</li>";
    outHtml += "<li>total time: " + getMMSSString(totalTimeAttempts) + "</li>";
    outHtml += "<li>average time per attempt: " + getMMSSString(averageTimeAttempts) + "</li>";
    outHtml += "</ul><br>Head over <a href='new.html'>here</a> to create a" +
        " new test!";
    return outHtml;
}

function setPageTitle() {
    document.getElementById("create-new-test").innerHTML = getTitle();
}

function populatePage() {
    setPageTitle();

    document.getElementById("test-summary").innerHTML = getPageContent();
}

populatePage();