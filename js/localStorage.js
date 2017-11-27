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
        questions.push({
            "q": question,
            "a": answers
        });
    }
    return shuffle(questions);
}

function createNewTest() {
    localStorage.setItem("attemptNumber", "0");
    localStorage.setItem("totalTime", "0");
}

function getTestAttemptNumber() {
    return localStorage.getItem("attemptNumber");
}

function getTestTotalTime() {
    return localStorage.getItem("totalTime");
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

function setStatusPaused() {
    localStorage.setItem("status", "pause");
}

function setStatusFinished() {
    localStorage.setItem("status", "finish");
}

function isTestNew() {
    return getCurrentStatus() === "new";
}

function isTestRunning() {
    return getCurrentStatus() === "running";
}

function setStatusRunning() {
    localStorage.setItem("status", "running");
}

function isTestPaused() {
    return getCurrentStatus() === "pause";
}

function isTestFinished() {
    return getCurrentStatus() === "finish";
}
