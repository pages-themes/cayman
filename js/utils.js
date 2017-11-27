/**
 * Fisher-Yates shuffler
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/**
 * Turns number of seconds into number of minutes and seconds
 * @param seconds
 */
function getMMSS(seconds) {
    return {
        "m": Math.floor(seconds / 60),
        "s": seconds % 60
    }
}

function getMMSSString(seconds) {
    var mmss = getMMSS(seconds);
    var mString = mmss["m"].toString();
    if (mString.length < 2) {
        mString = "0" + mString;
    }

    var sString = mmss["s"].toString();
    if (sString.length < 2) {
        sString = "0" + sString;
    }

    return mString + ":" + sString;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}