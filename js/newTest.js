function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageInput").change(function () {
    readURL(this);
    console.loge("reading url!");
});

function setQuestionImage(question) {
    var imageInput = document.getElementById("imageInput" + question);
    var imgData = getBase64Image(imageInput);
    saveQuestionImage(question, imgData);
}

function loadImage(e) {
    var URL = window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;
    img.onload = function () {
        img_width = img.width;
        img_height = img.height;
        context.drawImage(img, 0, 0, img_width, img_height);
    };
    console.log(e);
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
        outHtml += "<br><form id=\"imageForm" + i + "\"" +
            " onclick=\"setQuestionImage(" + i + ")\">\n" +
            "<p>Browse image (optional)</p>\n" +
            "<input type=\"file\" id=\"imageInput" + i + "\"" +
            " accept=\"image/x-png,image/gif,image/jpeg\">\n" +
            "</form>";
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

function createTest() {
    console.log("Starting new test. Time between attempts: " + getTimeBetweenAttempts());
    startNewTest();
    document.location.href = "test.html";  // go to test page
}

document.getElementById("confirmTestForm").style.display = 'none';