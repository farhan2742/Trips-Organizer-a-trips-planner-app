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