import {handleSubmit} from './js/formHandler';
import { postData } from './js/postData';
import { updateUI } from './js/updateUI';
import { buildMenu } from './js/buildMenu';
import { notScrolling } from './js/notScrolling';
import { articleExtract } from './js/articleExtract';
import { fetchCordinates } from './js/fetchCordinates';
import { hashtagExtract } from './js/hashtagExtract';
import { summaryExtract } from './js/summeryExtract';
import { allowedFormOptions } from './js/formOptions'
import { disableUrl, disableText } from './js/disableFormInputs'


import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss'


import logo from './imgs/logo.png'
import background from './imgs/background.jpg'
import feature1 from './imgs/feature1.jpg'
import feature2 from './imgs/feature2.jpg'
import feature3 from './imgs/feature3.jpg'
import feature4 from './imgs/feature4.jpg'


export {
	postData,
	updateUI,
	articleExtract,
	fetchCordinates,
	hashtagExtract,
	summaryExtract,
	allowedFormOptions
}

function run(){
	const formOptions = document.querySelector("#form__actions");
	const formText = document.querySelector("#text");
	const formURL = document.querySelector("#url");
	const formTitle = document.querySelector("#title");

	/*
	formText.addEventListener('change', function () {
		disableUrl();
	});

	formTitle.addEventListener('change', function () {
		disableUrl();
	});

	formURL.addEventListener('change', function () {
		disableText();
	});


	formOptions.addEventListener('change', function () {
		allowedFormOptions();
		
	});
	*/
	const navList = document.querySelector("#navbar__list");


// build the nav

	buildMenu();

	// Add class 'active' to section when near top of viewport


	// Scroll to anchor ID using scrollTO event

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


	// API call

	const formSubmit = document.getElementById('submit');
	formSubmit.addEventListener('click',function (event) {
		/*
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
			event.preventDefault();
			handleSubmit();
		}
		*/
		event.preventDefault();
			handleSubmit();
	});

document.addEventListener("DOMContentLoaded",run());