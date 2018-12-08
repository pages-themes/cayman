function getTitle() {
	if (isTestFinished()) {
		return "Test completed!"
	}
	return "Sorry .. you've not completed the test yet!"
}

function getPageContent() {
	let answers = getUserAnswers();
	let results = getResults();

	if (!isTestFinished()) {
		return "Please, head over <a href='new.html'>here</a> to create a" +
			" new test!";
	}

	let test = getLocalTest();
	let outHtml = "<h2>Summary of questions:</h2><ul>";
	for (let i = 0; i < test.length; i++) {
		if (results[i]) {
			outHtml += "<li class='right'>";
		} else {
			outHtml += "<li class='wrong'>";
		}

		outHtml += "<h2>Question #" + (i + 1) + "</h2>\n" +
			"<p><b>Question: </b>" + test[i]["question"] + "</p>\n" +
			"<p><b>Correct answer: </b>" + test[i]["correctAnswer"] + "</p>\n" +
			"<p><b>Your answer: </b>" + Array.from(answers[i]).join(' e ') + "</p>\n" +
			"<b>Other answers: </b><ul>";

		for (let j = 0; j < test[i]["wrongAnswers"].length; j++) {
			outHtml += "<li>" + test[i]["wrongAnswers"][j] + "</li>";
		}

		outHtml += "</ul></li>";
	}
	outHtml += "</ul><br><h2>Summary of attempts:</h2><br><ul>";
	let numAttempts = getTestAttemptNumber();
	let totalTimeAttempts = getTestTotalTime();

	outHtml += "<li># attempts: " + numAttempts + "</li>";
	outHtml += "<li>total time: " + getMMSSString(totalTimeAttempts) + "</li>";
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
