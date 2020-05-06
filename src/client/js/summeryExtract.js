function summaryExtract() {
	const articleURL = document.getElementById("url").value;
	const articleHeading = document.getElementById("title").value;
	const articleText = document.getElementById("text").value;

	if (articleURL !== "") {
		Client.postData("/extractSummeryUrl", {
			url: articleURL
		}) 
		.then(function()
		{
			Client.updateUI();
		})
	} else if (articleHeading !== "") {
		Client.postData("/extractSummaryText", {
			text: articleText,
			heading: articleHeading
		}) 
		.then(function() {
			Client.updateUI();
		})
	} else {
			window.alert("Something went wrong!");
	}
}

export { summaryExtract }