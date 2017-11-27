function getTitle() {
    if (isTestFinished()) {
        return "Test completed!"
    }
    return "Sorry .. you've not completed the test yet!"
}

function setPageTitle() {
    document.getElementById("create-new-test").innerHTML = getTitle();
}

function populatePage() {
    setPageTitle();
}

populatePage();