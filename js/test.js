// global vars
let attemptTime = 0; // seconds elapsed during attempt
let totalTime = getTestTotalTime(); // seconds elapsed during all test
let attemptNumber = getTestAttemptNumber() + 1;
let questions = null;
let currentQuestionIndex = -1;
let answers = {};

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
	let out = "Sorry .. it seems that you've not created the test yet!";
	out += " Please, head over <a href='new.html'>here</a> to create a new" +
		" one!";
	document.getElementById("test-canvas").innerHTML = out;


	document.getElementById("testHeader").innerHTML = "<section class=\"page-header\">\n" +
		"<h1 class=\"project-name\" align=\"center\">Ooops! Test not found!</h1>\n" +
		"</section>";

	$(".main-content").removeClass("test-content");
}

function getTestCanvas() {
	let testCanvasHtml = "<form id='questionsForm'>"; // start form
	testCanvasHtml += "<h2>Question #" + (currentQuestionIndex + 1) + "</h2>";
	testCanvasHtml += "<img id='image" + currentQuestionIndex + "' src=''>";
	testCanvasHtml += "<h3>" + questions[currentQuestionIndex]["question"] + "</h3>";
	let answers = questions[currentQuestionIndex]["allAnswers"];
	for (let j = 0; j < answers.length; j++) {
		if (answers[j].length > 0) {
			testCanvasHtml += "<input type='checkbox'" +
				" name='group" + currentQuestionIndex + "' value='" + answers[j] + "'>  " + answers[j] + "<br>";
		}
	}

	// submit button
	if (currentQuestionIndex === questions.length - 1) {
		testCanvasHtml += "<input style='margin-top: 8em;' type='button'" +
			" value='Submit'" +
			" onclick='submitTestAttempt()'></form>";
		testCanvasHtml += "<br><br>";
	}

	// next button
	if (currentQuestionIndex < questions.length - 1) {
		testCanvasHtml += "\n" +
			"        <button style=\"float: right;\" onclick=\"goToNextQuestion()\">Next</button>\n" +
			"    </div><br><br>";
	}

	return testCanvasHtml;
}

function setupTest() {
	questions = getTestQuestions();
	currentQuestionIndex = 0;
}

function populatePage() {
	document.getElementById("test-canvas").innerHTML = getTestCanvas();
	displayImageFromStorage("image" + currentQuestionIndex, "imageData" + currentQuestionIndex);
	loadAnswer();
}

function saveAnswer() {
	let formOptions = $("#questionsForm").find("input");
	let answered = new Set();
	for (let i = 0; i < formOptions.length; i++) {
		if (formOptions[i].checked) {
			answered.add(formOptions[i].value);
		}
	}

	answers[currentQuestionIndex] = answered;

	console.log(answered);
	console.log(answers);
}

function loadAnswer() {
	let formOptions = $("#questionsForm").find("input");
	let hasAlreadyAnswered = false;
	for (let i = 0; i < formOptions.length; i++) {
		if (formOptions[i].value === answers[currentQuestionIndex]) {
			formOptions[i].checked = true;
			hasAlreadyAnswered = true;
		}
	}

	if (hasAlreadyAnswered) {
		for (let i = 0; i < formOptions.length; i++) {
			formOptions[i].disabled = "disabled";
		}
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

function containSameStuff(as, bs) {
	for (let a of as) {
		if (!bs.has(a)) {
			return false;
		}
	}

	for (let b of as) {
		if (!as.has(b)) {
			return false;
		}
	}

	return true;
}

function checkAnswers() {
	let numWrongAnswers = 0;

	for (let i = 0; i < questions.length; i++) {
		if (!containSameStuff(answers[i], questions[i]["correctAnswers"])) {
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

	setTimeout(function () {
		window.location.href = "finish.html"
	}, 1000 * 3); // 3 seconds
}

function submitTestAttempt() {
	saveAnswer();
	setStatusSubmit();
	addTimeToTotal(attemptTime); // log attempt time
	logAttempt();
	logAnswers(answers);
	endTest(checkAnswers());
}

loadPage();
setInterval(displayTimer, 1000); // repeat this function each second

function displayImageFromStorage(imageId, storageId) {
	let image = document.getElementById(imageId);
	let imageData = localStorage.getItem(storageId);
	if (imageData !== null) {
		image.src = atob(imageData);
	}

}
