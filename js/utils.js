function getCurrentStatus() {
    var currentStatus = null;
    if (localStorage.status) {
        currentStatus = localStorage.getItem("status");
    }

    return currentStatus;
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