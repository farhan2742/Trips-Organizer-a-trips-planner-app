function allowedFormOptions() {
	const formAction = document.getElementById('form__actions').value;
	const formURL = document.getElementById('form__url');
	const formTitle = document.getElementById('form__title');
	const formText = document.getElementById('form__text');
	const formUrlInput =  document.getElementById('url');
	const formTextInput =  document.getElementById('text');
	const formTitleInput =  document.getElementById('title');
    const formValidation = document.querySelectorAll('.check__validation');

    for (var i = 0; i < formValidation.length; i++) {
        if (formValidation[i].classList.contains("is-invalid")) {
            formValidation[i].classList.remove("is-invalid")
        }
    }

	switch(formAction) {
    	case "entity":
    		formURL.classList.remove("d-none");
    		formUrlInput.required = true;
    		formUrlInput.parentElement.disabled = false;
    		formTitle.classList.add("d-none");
    		formTitle.required = false;
    		formTitle.parentElement.disabled = true;
    		formText.classList.remove("d-none");
    		formTextInput.required = true;
    		formTextInput.parentElement.disabled = false;
            if (formUrlInput.value !== "") {
                formTextInput.required = false;
                formTextInput.parentElement.disabled = true;
                formTitleInput.required = false;
                formTitleInput.parentElement.disabled = true;
                formUrlInput.required = true;
                formUrlInput.parentElement.disabled = false;
            }
            if (formTextInput.value !== "") {
                formUrlInput.required = false;
                formUrlInput.parentElement.disabled = true;
                formTextInput.required = true;
                formTextInput.parentElement.disabled = false;
                formTitleInput.required = true;
                formTitleInput.parentElement.disabled = false;
            }
    		break;
    	case "summarization":       
    		formURL.classList.remove("d-none");
    		formUrlInput.required = true;
    		formUrlInput.parentElement.disabled = false;
    		formTitle.classList.remove("d-none");
    		formTitleInput.required = true;
    		formTitle.parentElement.disabled = false;
    		formText.classList.remove("d-none");
    		formTextInput.required = false;
    		formTextInput.parentElement.disabled = false;
            if (formUrlInput.value !== "") {
                formTextInput.required = false;
                formTextInput.parentElement.disabled = true;
                formTitleInput.required = false;
                formTitleInput.parentElement.disabled = true;
                formUrlInput.required = true;
                formUrlInput.parentElement.disabled = false;
            }
            if ((formTextInput.value !== "") || (formTitleInput.value !== "")) {
                formUrlInput.required = false;
                formUrlInput.parentElement.disabled = true;
                formTextInput.required = true;
                formTextInput.parentElement.disabled = false;
                formTitleInput.required = true;
                formTitleInput.parentElement.disabled = false;
            }
    		break;
    	case "article":
    		formURL.classList.remove("d-none");
    		formUrlInput.required = true;
    		formUrlInput.parentElement.disabled = false;
    		formTitle.classList.add("d-none");
    		formTitle.required = false;
    		formTitle.parentElement.disabled = true;
    		formText.classList.add("d-none");
    		formText.required = false;
    		formTextInput.parentElement.disabled = true;
    		break;
    	case "hashtag":
    		formURL.classList.remove("d-none");
    		formUrlInput.required = true;
    		formUrlInput.parentElement.disabled = false;
    		formTitle.classList.add("d-none");
    		formTitle.required = false;
    		formTitle.parentElement.disabled = true;
    		formText.classList.remove("d-none");
    		formTextInput.required = true;
    		formTextInput.parentElement.disabled = false;
            if (formUrlInput.value !== "") {
                formTextInput.required = false;
                formTextInput.parentElement.disabled = true;
                formTitleInput.required = false;
                formTitleInput.parentElement.disabled = true;
                formUrlInput.required = true;
                formUrlInput.parentElement.disabled = false;
            }
            if (formTextInput.value !== "") {
                formUrlInput.required = false;
                formUrlInput.parentElement.disabled = true;
                formTextInput.required = true;
                formTextInput.parentElement.disabled = false;
                formTitleInput.required = true;
                formTitleInput.parentElement.disabled = false;
            }
    		break;
    	default:
    		window.alert("no action selected");
    		break;
	}
}

export { allowedFormOptions }