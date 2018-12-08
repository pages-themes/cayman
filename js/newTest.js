function loadNewTest() {
	setStatusNew();

	const input = document.getElementById('questionsFileInput');

	input.addEventListener('change', function () {
		$("#createNewTest").hide(); // hide upload button
		readXlsxFile(input.files[0]).then(function (data) {
			data.shift(); // remove header
			data = shuffle(data);
			showRawTest(data);
		}, (error) => {
			console.error(error);
			alert("Error while parsing Excel file. See console output for the error stack trace.")
		})
	});
}

function readImage(input, id) {
	let imgPreviewId = "imagePreview" + id;
	let storageItem = "imageData" + id;
	let img = document.getElementById(imgPreviewId);

	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = function (e) {
			img.src = reader.result;
			let binaryString = e.target.result;
			localStorage.setItem(storageItem, btoa(binaryString));
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function showRawTest(data) {
	let test = parseRawTest(data);

	let outHtml = "Please, check the questions before confirming the test<ul>";
	for (let i = 0; i < test.length; i++) {
		const question = test[i];

		outHtml +=
			"<li><h2>Question #" + (i + 1) + "</h2>\n" +
			"<p><b>Question: </b>" + question['question'] + "</p>\n" +
			"<p><b>Correct answer: </b>" + question['correctAnswer'] + "</p>\n" +
			"<b>Other answers: </b><ul>";

		for (let j = 0; j < question['wrongAnswers'].length; j++) {
			outHtml += "<li>" + question['wrongAnswers'][j] + "</li>";
		}

		outHtml += "</ul></li>";
		outHtml += "<br></br_><form>" +
			"        <p>Browse image (optional)</p>" +
			"        <input type='file' id='imageInput" + i + "'\n" +
			"               accept='image/x-png,image/gif,image/jpeg'" +
			"               onchange='readImage(this, " + i + ")'/>" +
			"        <img id='imagePreview" + i + "' src=''/>\n" +
			"    </form>";
	}
	outHtml += "</ul><br>";
	document.getElementById("confirmQuestions").innerHTML = outHtml;
	document.getElementById("confirmTestForm").style.display = '';

	setLocalTest(test);
}

function cancelNewTest() {
	setStatusFinished();
	purgeTest();
	document.location.href = "/";
}

function preProcessRawData(data) {
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (data[i][j] === null || data[i][j] === undefined) {
				data[i][j] = ''
			} else {
				data[i][j] = data[i][j].toString().trim() || '';
			}
		}
	}

	return data;
}

function parseRawTest(data) {
	data = preProcessRawData(data);

	let questions = [];

	for (let i = 0; i < data.length; i++) {
		let question = data[i][0];

		let correctAnswers = [];
		for (let k = 1; k <= 2; k++) {
			if (data[i][k].length > 0) { // if there is an answer
				correctAnswers.push(data[i][k])
			}
		}

		let otherAnswers = [];
		for (let j = 3; j < data[i].length - 1; j++) {
			if (data[i][j].length > 0) { // if there is an answer
				otherAnswers.push(data[i][j]);
			}
		}

		questions.push(
			{
				"question": question,
				"correctAnswers": new Set(correctAnswers), // set ...
				"correctAnswer": correctAnswers.join(" e "), // ... string
				"wrongAnswers": otherAnswers
			}
		)
	}

	return questions;
}

function createTest() {
	startNewTest();
	document.location.href = "test.html"; // go to test page
}

document.getElementById("confirmTestForm").style.display = 'none';
