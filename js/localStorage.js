function getCurrentStatus() {
    var currentStatus = null;
    if (localStorage.status) {
        currentStatus = localStorage.getItem("status");
    }

    return currentStatus;
}

function setLocalTest(test) {
    localStorage.setItem("test", JSON.stringify(test));
}

function setTestTimeout(timeBetweenAttempts) {
    localStorage.setItem("timeBetweenAttempts", timeBetweenAttempts);
}

function getLocalTest() {
    return JSON.parse(localStorage.getItem("test"));
}

function getQuestionAnswers(question) {
    var test = getLocalTest();
    for (var i = 0; i < test.length; i++) {
        if (test[i]["q"] === question) {
            var answers = test[i]["o"];  // answers
            answers.push(test[i]["a"]);  // add right answer
            return shuffle(answers);  // shuffle
        }
    }

    return [];
}

function getTestQuestions() {
    var test = getLocalTest();
    var questions = [];
    for (var i = 0; i < test.length; i++) {
        var question = test[i]["q"];
        var answers = getQuestionAnswers(question);
        var correctAnswer = test[i]["a"];
        questions.push({
            "q": question,
            "a": answers,
            "c": correctAnswer
        });
    }
    return shuffle(questions);
}

function startNewTest() {
    localStorage.setItem("attemptNumber", "0");
    localStorage.setItem("totalTime", "0");
    setStatusRunning();
}

function addTimeToTotal(seconds) {
    var totalTime = getTestTotalTime();
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
    localStorage.removeItem("test");  // test settings
    localStorage.removeItem("timeBetweenAttempts");

    localStorage.removeItem("attemptNumber");  // attempts stats
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
    var attemptNumber = getTestAttemptNumber();
    attemptNumber += 1;
    localStorage.setItem("attemptNumber", attemptNumber);
    console.log("Logging new attempt. New attempt # is " + attemptNumber);
}

function getTimeBetweenAttempts() {
    return parseInt(localStorage.getItem("timeBetweenAttempts"));
}

function saveQuestionImage(question, image) {
    var test = getLocalTest();
    test[question]["image"] = image;
    setLocalTest(test);
}