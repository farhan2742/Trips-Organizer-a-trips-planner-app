import { handleSubmit } from './js/formHandler';
import { postData } from './js/postData';
import { updateUI } from './js/updateUI';
import { buildMenu } from './js/buildMenu';
import { notScrolling } from './js/notScrolling';
import { changeBackground } from './js/changeBackground'
import { fetchAPIdata } from './js/fetchAPIdata';
import { saveLocal } from './js/saveLocal';




import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss'


import logo from './imgs/logo.png'
import background1 from './imgs/background1.jpg'
import background2 from './imgs/background2.jpg'
import background3 from './imgs/background3.jpg'
import background4 from './imgs/background4.jpg'
import background5 from './imgs/background5.jpg'
import background6 from './imgs/background6.jpg'
import background7 from './imgs/background7.jpg'
import background8 from './imgs/background8.jpg'
import background9 from './imgs/background9.jpg'
import background10 from './imgs/background10.jpg'
import destination1 from './imgs/destination1.jpg'
import destination2 from './imgs/destination2.jpg'
import destination3 from './imgs/destination3.jpg'
import destination4 from './imgs/destination4.jpg'
import destination5 from './imgs/destination5.jpg'
import destination6 from './imgs/destination6.jpg'
import destination7 from './imgs/destination7.jpg'
import destination8 from './imgs/destination8.jpg'
import destination9 from './imgs/destination9.jpg'
import destination10 from './imgs/destination10.jpg'
import feature1 from './imgs/feature1.jpg'
import feature2 from './imgs/feature2.jpg'
import feature3 from './imgs/feature3.jpg'
import feature4 from './imgs/feature4.jpg'




//export { handleSubmit, postData, updateUI, buildMenu, notScrolling, changeBackground, fetchAPIdata };

function run(){

	// build the nav
	if (document.querySelector(".navbar__menu")) {
		buildMenu();
	}
	saveLocal()
	.then(function() {
		updateUI();
	})
	


	// Change the backgound images

	setInterval(function(){ 
    	changeBackground();
	}, 10000);


	// Scroll to anchor ID using scrollTO event
	const navList = document.querySelector("#navbar__list");
	navList.addEventListener("click", function(event) {
		event.preventDefault();
		const clicked = event.target;
		const ScrollToElement = document.querySelector(clicked.getAttribute("href"));
	  	ScrollToElement.scrollIntoView({block: 'end', behavior: 'smooth'})}
	  	);
	
		

	
}

	// hide menu bar if scrolling stoped


	notScrolling(function(){
		const pageHeader = document.querySelector("#page__header");
		pageHeader.classList.add("d-none");
		window.addEventListener("scroll", function(){
			pageHeader.classList.remove("d-none");
		});
	})

	/*
	// API call
	if (document.getElementById('start')) {
		const formSubmit = document.getElementById('start');
		formSubmit.addEventListener('click',function (event) {
			event.preventDefault();
			const formValidation = document.querySelectorAll('.check__validation');
			let formValid = true;
			for (var i = 0; i < formValidation.length; i++) {
				formValidation[i].checkValidity();
				formValidation[i].reportValidity();
				if (formValidation[i].checkValidity() === false) {
					formValid = false;
					formValidation[i].classList.add("is-invalid");
				}
			}	
			if (formValid === true) {
				handleSubmit();
			}
		});
	}
	*/
document.addEventListener("DOMContentLoaded",run());