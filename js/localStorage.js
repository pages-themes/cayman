function getCurrentStatus() {
	let currentStatus = null;
	if (localStorage.status) {
		currentStatus = localStorage.getItem("status");
	}

	return currentStatus;
}

function setLocalTest(test) {
	for (let i = 0; i < test.length; i++) {
		test[i]['correctAnswers'] = Array.from(test[i]['correctAnswers']);
	} // set -> list to stringify

	const json = JSON.stringify(test);
	localStorage.setItem("test", json);
}

function getLocalTest() {
	let test = JSON.parse(localStorage.getItem("test"));

	for (let i = 0; i < test.length; i++) {
		test[i]['correctAnswers'] = new Set(test[i]['correctAnswers']);
	} // list -> set from stringify

	return test;
}

function getQuestionAnswers(question) {
	let test = getLocalTest();
	for (let i = 0; i < test.length; i++) {
		if (test[i]["question"] === question) {
			let answers = test[i]["wrongAnswers"]; // answers
			answers = answers.concat(Array.from(test[i]["correctAnswers"])); // add right answers

			return shuffle(answers);
		}
	}

	return [];
}

function getTestQuestions() {
	let test = getLocalTest();
	let questions = [];
	for (let i = 0; i < test.length; i++) {
		let question = test[i]["question"];
		let answers = getQuestionAnswers(question);
		let correctAnswer = test[i]["correctAnswers"];

		questions.push({
			"question": question,
			"allAnswers": answers, // all answers
			"correctAnswers": new Set(correctAnswer)
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
}

function saveAnswers(answers) {
	const jsonAnswers = {};
	Object.keys(answers).forEach(function (key) {
		jsonAnswers[key] = Array.from(answers[key]); // set -> list to stringify
	});

	answers = JSON.stringify(jsonAnswers);

	localStorage.setItem("answers", answers);
}

function getUserAnswers() {
	const answers = JSON.parse(localStorage.getItem("answers"));
	const parsed = {};

	Object.keys(answers).forEach(function (key) {
		parsed[key] = new Set(answers[key]); // list -> set from stringify
	});

	return parsed;
}

function setResults(results) {
	localStorage.setItem("results", JSON.stringify(results));
}

function getResults() {
	const results = localStorage.getItem("results");
	return JSON.parse(results);
}

/**
 * Saves times of questions in db
 * @param times times of questions
 */
function setTimes(times) {
	localStorage.setItem('times', JSON.stringify(times));
}

function getTimes() {
	return JSON.parse(localStorage.getItem('times'));
}
