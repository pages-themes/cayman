/**
 * Fisher-Yates shuffler
 * @param array
 * @returns {*}
 */
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
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
	let mmss = getMMSS(seconds);
	let mString = mmss["m"].toString();
	if (mString.length < 2) {
		mString = "0" + mString;
	}

	let sString = mmss["s"].toString();
	if (sString.length < 2) {
		sString = "0" + sString;
	}

	return mString + ":" + sString;
}
