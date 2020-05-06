const postData = async (url = '', data={}) => {
	console.log(data)
	const req = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify({
			heading: data.heading,
			text: data.text,
			url: data.url,
			place: data.place
		})
	});

	try{
		const newData = await req.json();
		return newData;
	}

	catch(error){
		console.log("error: " + error);
	}
};
export {postData}