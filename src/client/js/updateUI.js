const updateUI = async () => {
	if (document.querySelector("#section__plan")) {
		const trips = JSON.parse(localStorage.getItem('trips')) || []
		const ongoingTripsDiv = document.querySelector("#ongoing__trip__holder");
		const upcomingTripsDiv = document.querySelector("#upcoming__trip__holder");
		const expiredTripsDiv = document.querySelector("#expired__trip__holder");
		const currentDate = new Date();
		let upcomingTripCards = "";
		let expiredTripCards = "";
		let ongoingTripCards = "";
		if (trips.length > 0) {
			for (const trip of trips) {
				const tripID = trip._id
				const departureDate = new Date(trip.departureDate);
				const returnDate = new Date(trip.returnDate);
				const tripCardPartOne = `
				<div class="card cards col-lg-3">
		  			<img class="card-img-top cards__image" src="${trip.imageURL}" alt="${trip.destination} Image">
		  			<div class="card-body">
		  				<h5 class="card-title">${trip.title}</h5>
		  				<p class="card-text">
				`
				const tripCardPartThree = `
							<br><strong>Destination:</strong> ${trip.destination}
							<br><strong>From:</strong> ${trip.departureDate}
							<br><strong>To:</strong> ${trip.returnDate}
							<br><span class="text-center"><strong>Current Weather</strong></span>
							<br>${trip.currentWeather.weatherDescription}, ${trip.currentWeather.weatherTemp}<span>&#8451;</span>
						</p>
						<form class="form-inline" action="/trips/${tripID}" method="get">
							<button type="submit" class="btn btn-success" id="${trip.title}View">View Trip</button>
						</form>
					</div>
		  		</div>
				`
				if (currentDate < departureDate) {
					const dateDifference = departureDate.getTime() - currentDate.getTime();
					const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));
					const tripCardPartTwo = `<span class="text-info"><strong>Upcoming in ${dayDifference} days</strong></span>`
					upcomingTripCards += tripCardPartOne + tripCardPartTwo + tripCardPartThree;
				} else if (currentDate > returnDate) {
					const dateDifference = returnDate.getTime() - currentDate.getTime();
					const dayDifference = Math.abs(Math.ceil(dateDifference / (1000 * 3600 * 24)));
					const tripCardPartTwo = `<span class="text-danger"><strong>Expired ${dayDifference} days ago</strong></span>`
					expiredTripCards += tripCardPartOne + tripCardPartTwo + tripCardPartThree;
				} else if ((currentDate > departureDate) && (currentDate < returnDate) ) {
					const dateDifference = returnDate.getTime() - currentDate.getTime();
					const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));
					const tripCardPartTwo = `<span class="text-info"><strong>${dayDifference} days remaining</strong></span>`
					ongoingTripCards += tripCardPartOne + tripCardPartTwo + tripCardPartThree;				
				}
			}
			if (upcomingTripCards !== "") {
				document.querySelector("#upcoming-trips").classList.remove("d-none")
				upcomingTripsDiv.innerHTML = upcomingTripCards;
			}
			if (expiredTripCards !== "") {
				document.querySelector("#expired__trips").classList.remove("d-none")
				expiredTripsDiv.innerHTML = expiredTripCards;
			}
			if (ongoingTripCards !== "") {
				document.querySelector("#ongoing__trips").classList.remove("d-none")
				ongoingTripsDiv.innerHTML = ongoingTripCards;
			}
		}
	}
	if (document.querySelector("#section__trip__view")) {
		const trips = JSON.parse(localStorage.getItem('trips')) || []
		console.log(trips)
		const URLArray = window.location.href.split("/");
		let tripID = URLArray[URLArray.length-1];
		if (tripID.endsWith("?")) {
			tripID = tripID.slice(0,tripID.length-1)
		}
		let trip = trips.find(trip => trip._id == tripID);
		let destinationData = `
			<div class="card cards">
				<div class="card-header">
					<h3>${trip.destination}</h3>
				</div>
				<img class="card-img-top cards__image" src="${trip.imageURL}" alt="${trip.destination} image">
				<div class="card-body">
					<h5 class="card-title">Current Weather</h5>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">${trip.currentWeather.weatherDescription}</li>
						<li class="list-group-item">${trip.currentWeather.weatherTemp} <span>&#8451;</span></li>
						<li class="list-group-item"><strong>Wind Speed:</strong> ${trip.currentWeather.weatherWind} m/s</li>
						<li class="list-group-item"><strong>UV Index:</strong> ${trip.currentWeather.weatherUV}</li>
						<li class="list-group-item"><strong>Snow:</strong> ${trip.currentWeather.weatherSnow} mm/hr</li>
					</ul>
				</div>
				<div class="card-footer text-muted">
					Fetch on ${trip.currentWeather.weatherDate.slice(0,10)}
				</div>
			</div>
			`;
			let countryData = `
			<div class="card cards mt-5">
				<div class="card-header">
					<h3>${trip.countryData.name}</h3>
				</div>
				<img class="card-img-top" src="${trip.countryData.flag}" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">Country Information</h5>
					<ul class="list-group list-group-flush text-left">
						<li class="list-group-item"><strong>Capital:</strong> ${trip.countryData.capital}</li>
						<li class="list-group-item"><strong>Region:</strong> ${trip.countryData.region}</li>
						<li class="list-group-item"><strong>Population:</strong> ${trip.countryData.population}</li>
						<li class="list-group-item"><strong>Timezone:</strong> ${trip.countryData.timezones[0]}</li>
						<li class="list-group-item"><strong>Currency:</strong> ${trip.countryData.currencies[0].name}</li>
					</ul>
				</div>
			</div>
			`;
			const forcastDataHeader = `
			<table class="table table-sm">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Description</th>
						<th scope="col">Temperature</th>
						<th scope="col">Wind Speed</th>
						<th scope="col">UV Index</th>
						<th scope="col">Snow</th>
					</tr>
				</thead>
				<tbody>
			`
			let forcastDataRows = ``;		
			const forcastDataFooter = `
				</tbody>
			</table>
			`
			for (const forcast of trip.forcastWeather) {
				forcastDataRows += `
				<tr>
					<th scope="row">${forcast.weatherDate}</th>
					<td>${forcast.weatherDescription}</td>
					<td>${forcast.weatherTemp} <span>&#8451;</span></td>
					<td>${forcast.weatherWind} m/s</td>
					<td>${forcast.weatherUV}</td>
					<td>${forcast.weatherSnow} mm/hr</td>
				</tr>
				`
			}
			document.querySelector("#show").setAttribute("action", `/trips/${tripID}?_method=DELETE`)
			document.querySelector("#edit__button").setAttribute("href", `/trips/${tripID}/edit`)
			document.querySelector("#side__content").innerHTML = destinationData + countryData;
			document.querySelector("#trip__title").innerText = trip.title;
			document.querySelector("#departure").value = trip.departure;
			document.querySelector("#destination").value = trip.destination;
			document.querySelector("#departureDate").value = trip.departureDate;
			document.querySelector("#returnDate").value = trip.returnDate;
			document.querySelector("#forcast__div").innerHTML = forcastDataHeader + forcastDataRows + forcastDataFooter;
	}
	if (document.querySelector("#section__trip__new")) {
		const request = await fetch("/tripData");
		try {
			const trip = await request.json();
			let destinationData = `
			<div class="card cards">
				<div class="card-header">
					<h3>${trip.destination}</h3>
				</div>
				<img class="card-img-top cards__image" src="${trip.imageURL}" alt="${trip.destination} image">
				<div class="card-body">
					<h5 class="card-title">Current Weather</h5>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">${trip.currentWeather.weatherDescription}</li>
						<li class="list-group-item">${trip.currentWeather.weatherTemp} <span>&#8451;</span></li>
						<li class="list-group-item"><strong>Wind Speed:</strong> ${trip.currentWeather.weatherWind} m/s</li>
						<li class="list-group-item"><strong>UV Index:</strong> ${trip.currentWeather.weatherUV}</li>
						<li class="list-group-item"><strong>Snow:</strong> ${trip.currentWeather.weatherSnow} mm/hr</li>
					</ul>
				</div>
				<div class="card-footer text-muted">
					Fetch on ${trip.currentWeather.weatherDate.slice(0,10)}
				</div>
			</div>
			`;
			let countryData = `
			<div class="card cards mt-5">
				<div class="card-header">
					<h3>${trip.countryData.name}</h3>
				</div>
				<img class="card-img-top" src="${trip.countryData.flag}" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">Country Information</h5>
					<ul class="list-group list-group-flush text-left">
						<li class="list-group-item"><strong>Capital:</strong> ${trip.countryData.capital}</li>
						<li class="list-group-item"><strong>Region:</strong> ${trip.countryData.region}</li>
						<li class="list-group-item"><strong>Population:</strong> ${trip.countryData.population}</li>
						<li class="list-group-item"><strong>Timezone:</strong> ${trip.countryData.timezones[0]}</li>
						<li class="list-group-item"><strong>Currency:</strong> ${trip.countryData.currencies[0].name}</li>
					</ul>
				</div>
			</div>
			`;
			const forcastDataHeader = `
			<table class="table table-sm">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Description</th>
						<th scope="col">Temperature</th>
						<th scope="col">Wind Speed</th>
						<th scope="col">UV Index</th>
						<th scope="col">Snow</th>
					</tr>
				</thead>
				<tbody>
			`
			let forcastDataRows = ``;		
			const forcastDataFooter = `
				</tbody>
			</table>
			`
			for (const forcast of trip.forcastWeather) {
				forcastDataRows += `
				<tr>
					<th scope="row">${forcast.weatherDate}</th>
					<td>${forcast.weatherDescription}</td>
					<td>${forcast.weatherTemp} <span>&#8451;</span></td>
					<td>${forcast.weatherWind} m/s</td>
					<td>${forcast.weatherUV}</td>
					<td>${forcast.weatherSnow} mm/hr</td>
				</tr>
				`
			}
			document.querySelector("#side__content").innerHTML = destinationData + countryData;
			document.querySelector("#trip__title").innerText = trip.title;
			document.querySelector("#destination").value = trip.destination;
			document.querySelector("#departureDate").value = trip.departureDate;
			document.querySelector("#returnDate").value = trip.returnDate;
			document.querySelector("#forcast__div").innerHTML = forcastDataHeader + forcastDataRows + forcastDataFooter;
		} catch(error) {
			console.log("error:" + error);
		}
	}
	if (document.querySelector("#section__trip__edit")) {
		const trips = JSON.parse(localStorage.getItem('trips')) || []
		console.log(trips)
		let tripID = window.location.href.split("/");
		tripID = tripID[tripID.length-2];
		let trip = trips.find(trip => trip._id == tripID);
		let destinationData = `
			<div class="card cards">
				<div class="card-header">
					<h3>${trip.destination}</h3>
				</div>
				<img class="card-img-top cards__image" src="${trip.imageURL}" alt="${trip.destination} image">
				<div class="card-body">
					<h5 class="card-title">Current Weather</h5>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">${trip.currentWeather.weatherDescription}</li>
						<li class="list-group-item">${trip.currentWeather.weatherTemp} <span>&#8451;</span></li>
						<li class="list-group-item"><strong>Wind Speed:</strong> ${trip.currentWeather.weatherWind} m/s</li>
						<li class="list-group-item"><strong>UV Index:</strong> ${trip.currentWeather.weatherUV}</li>
						<li class="list-group-item"><strong>Snow:</strong> ${trip.currentWeather.weatherSnow} mm/hr</li>
					</ul>
				</div>
				<div class="card-footer text-muted">
					Fetch on ${trip.currentWeather.weatherDate.slice(0,10)}
				</div>
			</div>
			`;
			let countryData = `
			<div class="card cards mt-5">
				<div class="card-header">
					<h3>${trip.countryData.name}</h3>
				</div>
				<img class="card-img-top" src="${trip.countryData.flag}" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">Country Information</h5>
					<ul class="list-group list-group-flush text-left">
						<li class="list-group-item"><strong>Capital:</strong> ${trip.countryData.capital}</li>
						<li class="list-group-item"><strong>Region:</strong> ${trip.countryData.region}</li>
						<li class="list-group-item"><strong>Population:</strong> ${trip.countryData.population}</li>
						<li class="list-group-item"><strong>Timezone:</strong> ${trip.countryData.timezones[0]}</li>
						<li class="list-group-item"><strong>Currency:</strong> ${trip.countryData.currencies[0].name}</li>
					</ul>
				</div>
			</div>
			`;
			const forcastDataHeader = `
			<table class="table table-sm">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Description</th>
						<th scope="col">Temperature</th>
						<th scope="col">Wind Speed</th>
						<th scope="col">UV Index</th>
						<th scope="col">Snow</th>
					</tr>
				</thead>
				<tbody>
			`
			let forcastDataRows = ``;		
			const forcastDataFooter = `
				</tbody>
			</table>
			`
			for (const forcast of trip.forcastWeather) {
				forcastDataRows += `
				<tr>
					<th scope="row">${forcast.weatherDate}</th>
					<td>${forcast.weatherDescription}</td>
					<td>${forcast.weatherTemp} <span>&#8451;</span></td>
					<td>${forcast.weatherWind} m/s</td>
					<td>${forcast.weatherUV}</td>
					<td>${forcast.weatherSnow} mm/hr</td>
				</tr>
				`
			}
			document.querySelector("#edit").setAttribute("action", `/trips/${tripID}?_method=PUT`)
			document.querySelector("#side__content").innerHTML = destinationData + countryData;
			document.querySelector("#trip__title").innerText = `Edit ${trip.title}`;
			document.querySelector("#departure").value = trip.departure;
			document.querySelector("#destination").value = trip.destination;
			document.querySelector("#departureDate").value = trip.departureDate;
			document.querySelector("#returnDate").value = trip.returnDate;
			document.querySelector("#forcast__div").innerHTML = forcastDataHeader + forcastDataRows + forcastDataFooter;
	}				
};

export {updateUI}