const saveLocal = async () => {
	const request = await fetch("/all");
	try {
		const serverData = await request.json();

		if (serverData.trips.length > 0) {
			if (localStorage.trips) {
				let TempData = JSON.parse(localStorage.getItem('trips')) || [];
				const newData = serverData.trips[serverData.trips.length - 1]
				const dub = localStorage.getItem('dub');
				const dubCheck = JSON.stringify(newData)
				console.log(dubCheck)
				if (dub !== dubCheck) {
					TempData.push(newData)
					const dublicateChecker = TempData[TempData.length - 1]
					localStorage.setItem('dub', JSON.stringify(dublicateChecker));
					localStorage.setItem('trips', JSON.stringify(TempData));
				}

			} else {
				localStorage.setItem('trips', JSON.stringify(serverData.trips));
			}
			
		}
	} catch(error) {
		console.log("error:" + error);
	}
	
}

export { saveLocal }
