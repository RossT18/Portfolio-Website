const text = "Hello, this is an example paragraph. Look at all these words being placed one by one!<br>New Line?<br>Not sure what else I can write.<br>This is just an example<br><br>A big gap ^<br>It's peaceful down here :)";

function splitIntoWords(txt) {
	return txt.split(" ");
}


let i = 0;
let speed = 30;
function wordWriter() {
	const words = splitIntoWords(text);
	if (i < words.length) {
		$("#about-me-container").append(words[i] + " ");
		i++;
		setTimeout(wordWriter, speed);
	}
}


function slideshow(delay) {
	let index = 0
	const bgImages = document.querySelectorAll('.container .bg-img') // Get the images to be cycled.

	setInterval(() => {
		index++;
		if (index >= bgImages.length) {
			index = 0;
		}

		bgImages[index].classList.add('show')

		let prev = index - 1;
		if (prev < 0) {
			prev = bgImages.length - 1;
		}

		bgImages[prev].classList.remove('show')
	}, delay);
}

$(function() {
	slideshow(5000); // Start when the document is ready.
	wordWriter();
});