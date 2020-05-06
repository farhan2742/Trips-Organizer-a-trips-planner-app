function articleExtract() {
	const articleURL = document.getElementById("url").value;
	
	Client.postData("/extractArticle", {
		url: articleURL
	}) .then(function()
		{
			Client.updateUI();
		})
}

export { articleExtract }