function loadNewTest() {
    setStatusNew();

    var questionsFileInput = document.getElementById("questionsFileInput");
    var timeBetweenAttempts = document.getElementById("timeBetweenAttempts").value;

    Papa.parse(questionsFileInput.files[0], {
        complete: function (results) {
            showRawTest(results.data);
        }
    });
}


function showRawTest(data) {
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
}


function cancelNewTest() {
    document.location.href = "/";
}


function createNewTest() {
    console.log("creating test!");
}