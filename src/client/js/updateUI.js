const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const trips = await request.json();
		console.log(trips.trips)
		/*
		const resultDiv = document.getElementById('results__holder');
		let result = "";
		const serverData = await request.json();
		const extractedEntities = serverData.extractedEntities;
		const extractedArticle = serverData.extractedArticle;
		const extractedSummary = serverData.extractedSummary;
		const extractedHashtags = serverData.extractedHashtags;
		const formAction = document.getElementById('form__actions').value;
		switch(formAction) {
	    	case "entity":
	    		if ('entities' in extractedEntities) {
	    			console.log("entities");
					let entitiesData = `
							<div>
								<h2>Entities</h2>
								<p>Following are the entities extracted from the given data</p>`;	

					if ('organization' in extractedEntities.entities){
						let organizationData = `
							<h3>Organizations</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.organization.length; i++) {
							organizationData += `<li>${extractedEntities.entities.organization[i]}</li>`;
						}
						organizationData +=	`</ol>`;
						entitiesData += organizationData;
					}

					if ('location' in extractedEntities.entities){
						let locationsData = `
							<h3>Locations</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.location.length; i++) {
							locationsData += `<li>${extractedEntities.entities.location[i]}</li>`;
						}
						locationsData +=	`</ol>`;
						entitiesData += locationsData;
					}

					if ('person' in extractedEntities.entities){
						let personData = `
							<h3>Peoole</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.person.length; i++) {
							personData += `<li>${extractedEntities.entities.person[i]}</li>`;
						}
						personData +=	`</ol>`;
						entitiesData += personData;
					}

					if ('product' in extractedEntities.entities){
						let productData = `
							<h3>Products</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.product.length; i++) {
							productData += `<li>${extractedEntities.entities.product[i]}</li>`;
						}
						productData +=	`</ol>`;
						entitiesData += productData;
					}

					if ('date' in extractedEntities.entities){
						let dateData = `
							<h3>Dates</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.date.length; i++) {
							dateData += `<li>${extractedEntities.entities.date[i]}</li>`;
						}
						dateData +=	`</ol>`;
						entitiesData += dateData;
					}

					if ('keyword' in extractedEntities.entities) {
						let keywordsData = `
							<h3>Keywords</h3>
							<ol>`;

						for (var i = 0; i < extractedEntities.entities.keyword.length; i++) {
							keywordsData += `<li>${extractedEntities.entities.keyword[i]}</li>`;
						}
						keywordsData +=	`</ol>`;
						entitiesData += keywordsData;
					}
					entitiesData += `</div>`
					result += entitiesData;	
				}
	    		break;

	    	case "summarization":
	    		if ('sentences' in extractedSummary) {
	    			console.log("summary");
	    			let summary = extractedSummary.sentences;
					let summaryData = `
						<article>
							<h2>Summary</h2>
							<p>${summary}</p>
						</article>`;	
					result += summaryData;
				}
	    		break;

	    	case "article":
	    		if ('article' in extractedArticle) {
	    			console.log("article");
					let articleData = `
						<article>
							<h2>Article</h2>
							<p>Below is the article extracted from the given URL</p>`;	

					if ('title' in extractedArticle) {
						let titleData = "";
						let title = extractedArticle.title;
						titleData += `
							<h3>${title}</h3>`;
						articleData += titleData;
					}

					if ('article' in extractedArticle) {
						let articleTextData = "";
						let article = extractedArticle.article;
						articleTextData += `
							<p>${article}</p>`;
						articleData += articleTextData;
					}

					if ('author' in extractedArticle) {
						let authorData = "";
						let author = extractedArticle.author;
						authorData += `
							<p>${author}</p>`;
						articleData += authorData;
					}

					articleData += `</article>`
					result += articleData;
				}
	    		break;
	    	case "hashtag":
	    		if ('hashtags' in extractedHashtags) {
					let hashtagData = `
						<h3>Suggested Hashtags</h3>
							<ol>`;
						for (var i = 0; i < extractedHashtags.hashtags.length; i++) {
							hashtagData += `<li>${extractedHashtags.hashtags[i]}</li>`;
						}
					hashtagData +=	`</ol>`;	
					result += hashtagData;
				}
	    		break;
	    	default:
	    		window.alert("no action selected");
	    }
		
		resultDiv.innerHTML = result

	*/			
	} catch(error) {
		console.log("error:" + error);
	}
};

export {updateUI}