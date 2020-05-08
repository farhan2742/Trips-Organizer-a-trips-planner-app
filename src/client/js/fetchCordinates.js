function fetchCordinates() {
	const cityName = document.getElementById("destination").value;
	if (cityName !== "") {
		Client.postData("/getCordinates", {
			place: cityName
		}) 
		.then(function()
		{
			Client.updateUI();
		})
	} else {
			window.alert("Something went wrong!");
	}

}

export { fetchCordinates }