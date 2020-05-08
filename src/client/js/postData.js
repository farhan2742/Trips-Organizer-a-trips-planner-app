const postData = async (url = '', data={}) => {
	console.log(data)
	const req = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify({
			title: data.title,
			destination: data.destination,
			departureDate: data.departureDate,
			returnDate: data.returnDate
		})
	});

	try{
		console.log("Data sent");
	}

	catch(error){
		console.log("error: " + error);
	}
};
export {postData}