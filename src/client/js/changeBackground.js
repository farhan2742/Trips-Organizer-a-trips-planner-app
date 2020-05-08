function changeBackground() {
	const backgoundNumber = Math.floor(Math.random() * 10) + 1;
	if (document.querySelector(".section__login")) {
		const background = document.querySelector(".section__login");
		background.style.backgroundImage = `url("/imgs/background${backgoundNumber}.jpg")`;
	} else if (document.querySelector(".section__plan")) {
		const destination = document.querySelector(".section__plan");
		destination.style.backgroundImage = `url("/imgs/destination${backgoundNumber}.jpg")`;
	} else {
		console.log("Error with background images");
	}
}

export { changeBackground }
