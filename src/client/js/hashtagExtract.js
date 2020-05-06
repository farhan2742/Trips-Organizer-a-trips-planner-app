function hashtagExtract() {
	const articleURL = document.getElementById("url").value;
	const articleText = document.getElementById("text").value;
	if (articleURL !== "") {
		Client.postData("/extractHashtagUrl", {
			url: articleURL
		}) 
		.then(function()
		{
			Client.updateUI();
		})
	} else if (articleText !== "") {
		Client.postData("/extractHashtagText", {
			text: articleText,
		}) 
		.then(function() {
			Client.updateUI();
		}) 
	}	else {
			window.alert("Something went wrong!");
	}
}

export { hashtagExtract }