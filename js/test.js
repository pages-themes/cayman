function showErrorLoadingTest() {
    var out = "Sorry .. it seems that you've not created the test yet!";
    out += "\nPlease, head over <a href='new.html'>here</a> to create a new" +
        " one!";
    document.getElementById("test-canvas").innerHTML = out;


    document.getElementById("testHeader").innerHTML = "<section class=\"page-header\">\n" +
        "<h1 class=\"project-name\" align=\"center\">Ooops! Test not found!</h1>\n" +
        "</section>";

    $(".main-content").removeClass("test-content");
}


function populatePage() {
    document.getElementById("attemptCounter").innerHTML = getTestAttemptNumber();
    document.getElementById("totalTimer").innerHTML = getTestTotalTime();
    console.log("populating page...");
    console.log(getTest());
}

function loadPage() {
    if (isTestRunning()) {
        populatePage();
    } else {
        showErrorLoadingTest();
    }
}

loadPage();