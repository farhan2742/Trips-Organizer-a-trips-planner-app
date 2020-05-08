import { postData } from './postData';

function fetchAPIdata() {
	const title = document.getElementById("title").value;
	const destination = document.getElementById("destination").value;
	const departureDate = document.getElementById("departureDate").value;
	const returnDate = document.getElementById("returnDate").value;
	if (destination !== "") {
		postData("/fetchCordinates", {
			title: title,
			destination: destination,
			departureDate: departureDate,
			returnDate: returnDate
		}) 
		.then(function (){
			console.log("In Then")
			postData("/fetchCurrentWeather", {
				title: title,
			}) 
		})
	} 

	else {
		window.alert("Something went wrong!");
	} 
}

export { fetchAPIdata }
/*
.then(function()
		{
			Client.updateUI();
		})
	} 
*/