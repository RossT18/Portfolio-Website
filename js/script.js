const text = "My name is Ross and I am a BSc Computer Science student due to graduate from Lancaster University in the summer of 2021.<br><br>I am an experienced problem-solver who enjoys creating programming projects in my spare time.<br>I find learning new languages and comparing them to others rewarding as well.<br><br>A selection of projects can be found in the link at the top of the page along with my CV (where it can be downloaded or viewed in the page).<br><br>Below are links to other profiles of mine as well as contact information."

/*
My name is Ross and I am a BSc Computer Science student due to graduate from Lancaster University in the summer of 2021.

I am an experienced problem-solver who enjoys creating programming projects in my spare time.
I find learning new languages and comparing them to others rewarding as well.

A selection of projects can be found in the link at the top of the page along with my CV (where it can be downloaded or viewed in the page).

Below are links to other profiles of mine as well as contact information.
*/

function splitIntoWords(txt) {
	return txt.split(" ");
}


let i = 0;
let speed = 4;
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

$.getJSON("js/projects.json", function(data) {
	const imagePath = data.image_path;
	const linkSeparator = data.link_separator;
	const projects = data.projects;
	/* EXAMPLE
	<div class="project-box">
		<div class="project-box-content">
			<img src="img/projects/missing-icon.png">
			<div class="project-box-details">
				<h2>My Portfolio Website</h2>
				<p>
					
				</p>
				<div class="project-box-links">
					<a href="https://github.com/RossT18/Portfolio-Website" target="_blank">GitHub Repository</a>
				</div>
			</div>
		</div>
	</div>
	*/
	projects.forEach(project => {
		let projectLinksDiv = document.createElement("div");
		projectLinksDiv.setAttribute("class", "project-box-links");
		const projectLinks = project.project_links;

		for (let i = 0; i < projectLinks.length; i++) {
			const link = projectLinks[i];
			let linkTag = document.createElement("a");
			linkTag.href = link.url;
			linkTag.innerHTML = link.name;
			linkTag.target = "_blank";
			let linkSepP = document.createElement("p");
			linkSepP.innerHTML = linkSeparator;
			if (i == projectLinks.length - 1) {
				$(projectLinksDiv).append(linkTag); //Don't add a separator if it's the last item.
			} else {
				$(projectLinksDiv).append(linkTag, linkSepP);
			}
		}

		let projectTitle = document.createElement("h2");
		projectTitle.innerHTML = project.project_name;
		let projectDesc = document.createElement("p");
		projectDesc.innerHTML = project.project_description;

		let projectDetailsDiv = document.createElement("div");
		projectDetailsDiv.setAttribute("class", "project-box-details");
		$(projectDetailsDiv).append(projectTitle, projectDesc, projectLinksDiv)

		let projectImage = document.createElement("img");
		projectImage.src = imagePath + project.project_image_name;

		let projectBoxContentDiv = document.createElement("div");
		projectBoxContentDiv.setAttribute("class", "project-box-content");
		$(projectBoxContentDiv).append(projectImage, projectDetailsDiv)

		let projectBoxDiv = document.createElement("div");
		projectBoxDiv.setAttribute("class", "project-box");
		$(projectBoxDiv).append(projectBoxContentDiv);

		$("#project-container").append(projectBoxDiv);
	});
});