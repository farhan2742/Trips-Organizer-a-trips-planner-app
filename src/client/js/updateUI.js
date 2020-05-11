const updateUI = () => {
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
			const departureDate = new Date(trip.departureDate);
			const returnDate = new Date(trip.returnDate);
			if (currentDate < departureDate) {
				const dateDifference = departureDate.getTime() - currentDate.getTime();
				const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));
				upcomingTripCards += `
			  		<div class="card cards col-lg-3">
			  			<img class="card-img-top cards__image" src="${trip.imageURL}" alt="Card image cap">
			  			<div class="card-body">
			  				<h5 class="card-title">${trip.title}</h5>
			  				<p class="card-text">
			  					<span class="text-info"><strong>Upcoming in ${dayDifference} days</strong></span>
				  				<br><strong>Destination:</strong> ${trip.destination}
				  				<br><strong>From:</strong> ${trip.departureDate}
				  				<br><strong>To:</strong> ${trip.returnDate}
				  				<br><span class="text-center"><strong>Current Weather</strong></span>
				  				<br>${trip.currentWeather[0].currentWeatherDescription}, ${trip.currentWeather[0].currentWeatherTemp}<span>&#8451;</span>
			  				</p>
			  				<form class="form-inline" action="/trip" method="get">
								<button type="submit" class="btn btn-success" id="${trip.title}View">View Trip</button>
							</form>
			  			</div>
			  		</div>`
			} else if (currentDate > returnDate) {
				const dateDifference = returnDate.getTime() - currentDate.getTime();
				const dayDifference = Math.abs(Math.ceil(dateDifference / (1000 * 3600 * 24)));
				expiredTripCards += `
			  		<div class="card cards col-lg-3">
			  			<img class="card-img-top cards__image" src="${trip.imageURL}" alt="Card image cap">
			  			<div class="card-body">
			  				<h5 class="card-title">${trip.title}</h5>
				  			<p class="card-text">
				  				<span class="text-danger"><strong>Expired ${dayDifference} days ago</strong></span>
				  				<br><strong>Destination:</strong> ${trip.destination}
				  				<br><strong>From:</strong> ${trip.departureDate}
				  				<br><strong>To:</strong> ${trip.returnDate}
				  				<br><span class="text-center"><strong>Current Weather</strong></span>
				  				<br>${trip.currentWeather[0].currentWeatherDescription}, ${trip.currentWeather[0].currentWeatherTemp}<span>&#8451;</span>
			  				</p>
			  				<form class="form-inline" action="/trip" method="get">
								<button type="submit" class="btn btn-success" id="${trip.title}View">View Trip</button>
							</form>
			  			</div>
			  		</div>`
			} else if ((currentDate > departureDate) && (currentDate < returnDate) ) {
				const dateDifference = returnDate.getTime() - currentDate.getTime();
				const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));
				ongoingTripCards += `
			  		<div class="card cards col-lg-3">
			  			<img class="card-img-top cards__image" src="${trip.imageURL}" alt="Card image cap">
			  			<div class="card-body">
			  				<h5 class="card-title">${trip.title}</h5>
			  				<p class="card-text">
			  					<span class="text-info"><strong>${dayDifference} days remaining</strong></span>
				  				<br><strong>Destination:</strong> ${trip.destination}
				  				<br><strong>From:</strong> ${trip.departureDate}
				  				<br><strong>To:</strong> ${trip.returnDate}
				  				<br><span class="text-center"><strong>Current Weather</strong></span>
				  				<br>${trip.currentWeather[0].currentWeatherDescription}, ${trip.currentWeather[0].currentWeatherTemp}<span>&#8451;</span>
			  				</p>
			  				<form class="form-inline" action="/trip" method="get">
								<button type="submit" class="btn btn-success" id="${trip.title}View">View Trip</button>
							</form>
			  			</div>
			  		</div>`
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
};

export {updateUI}