function loadNewTest() {
    setStatusNew();

    var questionsFileInput = document.getElementById("questionsFileInput");
    var timeBetweenAttempts = document.getElementById("timeBetweenAttempts").value;

    Papa.parse(questionsFileInput.files[0], {
        complete: function (results) {
            showRawTest(results.data, timeBetweenAttempts);
        }
    });
}

function showRawTest(data, timeAttempts) {
    var numQuestions = data.length;
    var outHtml = "Please, check the questions before confirming the test<ul>";
    for (var i = 0; i < numQuestions; i++) {
        outHtml +=
            "<li><h2>Question #" + (i + 1) + "</h2>\n" +
            "<p><b>Question: </b>" + data[i][0] + "</p>\n" +
            "<p><b>Correct answer: </b>" + data[i][1] + "</p>\n" +
            "<b>Other answers: </b><ul>";

        for (var j = 0; j < data[i].length - 2; j++) {
            outHtml += "<li>" + data[i][j + 2] + "</li>";
        }

        outHtml += "</ul></li>";
    }
    outHtml += "</ul>";
    document.getElementById("confirmQuestions").innerHTML = outHtml;
    document.getElementById("confirmTestForm").style.display = '';

    var questions = getTest(data);
    setLocalTest(questions);
    setTestTimeout(timeAttempts);
}

function cancelNewTest() {
    setStatusFinished();
    purgeTest();
    document.location.href = "/";
}

function getTest(data) {
    var numQuestions = data.length;
    var questions = [];
    for (var i = 0; i < numQuestions; i++) {
        var question = data[i][0];
        var correctAnswer = data[i][1];
        var otherAnswers = [];
        for (var j = 0; j < data[i].length - 2; j++) {
            otherAnswers.push(data[i][j + 2]);
        }
        questions.push(
            {
                "q": question,
                "a": correctAnswer,
                "o": otherAnswers
            }
        )
    }
    return questions;
}

function createNewTest() {
    setStatusRunning();
}

document.getElementById("confirmTestForm").style.display = 'none';