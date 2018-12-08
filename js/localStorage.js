function getCurrentStatus() {
	let currentStatus = null;
	if (localStorage.status) {
		currentStatus = localStorage.getItem("status");
	}

	return currentStatus;
}

function setLocalTest(test) {
	localStorage.setItem("test", JSON.stringify(test));
}

function getLocalTest() {
	return JSON.parse(localStorage.getItem("test"));
}

function getQuestionAnswers(question) {
	let test = getLocalTest();
	for (let i = 0; i < test.length; i++) {
		if (test[i]["q"] === question) {
			let answers = test[i]["o"]; // answers
			answers.push(test[i]["a"]); // add right answer
			return answers; // shuffle
		}
	}

	return [];
}

function getTestQuestions() {
	let test = getLocalTest();
	let questions = [];
	for (let i = 0; i < test.length; i++) {
		let question = test[i]["q"];
		let answers = getQuestionAnswers(question);
		let correctAnswer = test[i]["a"];
		questions.push({
			"q": question,
			"a": answers,
			"c": new Set(correctAnswer)
		});
	}
	return questions;
}

function startNewTest() {
	localStorage.setItem("attemptNumber", "0");
	localStorage.setItem("totalTime", "0");
	setStatusRunning();
}

function addTimeToTotal(seconds) {
	let totalTime = getTestTotalTime();
	totalTime += seconds;
	localStorage.setItem("totalTime", totalTime);
}

function getTestAttemptNumber() {
	return parseInt(localStorage.getItem("attemptNumber"));
}

function getTestTotalTime() {
	return parseInt(localStorage.getItem("totalTime"));
}

function purgeTest() {
	let test = getLocalTest();
	for (let i = 0; i < test.length; i++) {
		localStorage.removeItem("imageData" + i); // remove images
	}

	localStorage.removeItem("test"); // test settings

	localStorage.removeItem("attemptNumber"); // attempts stats
	localStorage.removeItem("totalTime");

	setStatusFinished();
}

function setStatusNew() {
	localStorage.setItem("status", "new");
}

function setStatusRunning() {
	localStorage.setItem("status", "running");
}

function setStatusSubmit() {
	localStorage.setItem("status", "submit");
}

function setStatusFinished() {
	localStorage.setItem("status", "finish");
}

function isTestRunning() {
	return getCurrentStatus() === "running";
}

function isTestSubmit() {
	return getCurrentStatus() === "submit";
}

function isTestFinished() {
	return getCurrentStatus() === "finish";
}

function logAttempt() {
	let attemptNumber = getTestAttemptNumber();
	attemptNumber += 1;
	localStorage.setItem("attemptNumber", attemptNumber);
	console.log("Logging new attempt. New attempt # is " + attemptNumber);
}

function logAnswers(answers) {
	localStorage.setItem("answers", JSON.stringify(answers));
}

function getUserAnswers() {
	return JSON.parse(localStorage.getItem("answers"));
}
