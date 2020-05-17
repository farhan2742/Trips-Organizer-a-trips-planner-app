

const saveLocal = async () => {
	
	const request = await fetch("/fetchData");
	try {
		const serverData = await request.json();
		if (localStorage.trips) {
			const dub = localStorage.getItem('dub');
			const dubCheck = JSON.stringify(serverData[serverData.length-1])
			if (dub !== dubCheck) {
				const dublicateChecker = JSON.stringify(serverData[serverData.length-1])
				localStorage.setItem('dub', JSON.stringify(dublicateChecker));
				localStorage.setItem('trips', JSON.stringify(serverData));
				console.log("finished")
			}
		} else {
			localStorage.setItem('trips', JSON.stringify(serverData));
		}
	} catch(error) {
		console.log("error:" + error);
	}
	
}

export { saveLocal }
