function loadNewTest() {
    setStatusNew();

    var questionsFileInput = document.getElementById("questionsFileInput");

    Papa.parse(questionsFileInput.files[0], {
        complete: function (results) {
            showRawTest(results.data);
        }
    });
}

function readImage(input, id) {
    var imgPreviewId = "imagePreview" + id;
    var storageItem = "imageData" + id;
    var img = document.getElementById(imgPreviewId);
    console.log("reading img", imgPreviewId, storageItem, "into", img);
    console.log(input);

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            img.src = reader.result;
            var binaryString = e.target.result;
            localStorage.setItem(storageItem, btoa(binaryString));
        };

        reader.readAsDataURL(input.files[0]);
    }
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
        outHtml += "<br></br_><form>" +
            "        <p>Browse image (optional)</p>" +
            "        <input type='file' id='imageInput" + i + "'\n" +
            "               accept='image/x-png,image/gif,image/jpeg'" +
            "               onchange='readImage(this, " + i + ")'/>" +
            "        <img id='imagePreview" + i + "' src=''/>\n" +
            "    </form>";
    }
    outHtml += "</ul><br>";
    document.getElementById("confirmQuestions").innerHTML = outHtml;
    document.getElementById("confirmTestForm").style.display = '';

    var questions = getTest(data);
    setLocalTest(questions);
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

function createTest() {
    console.log("Starting new test.");
    startNewTest();
    document.location.href = "test.html";  // go to test page
}

document.getElementById("confirmTestForm").style.display = 'none';
