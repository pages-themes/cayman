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


function getLocalTest() {
    return JSON.parse(localStorage.getItem("test"));
}


function purgeTest() {
    localStorage.removeItem("test");
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


function isTestPaused() {
    return getCurrentStatus() === "pause";
}


function isTestFinished() {
    return getCurrentStatus() === "finish";
}