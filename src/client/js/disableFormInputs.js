function disableUrl() {
	const formTitleInput =  document.getElementById('title');
	const formTextInput =  document.getElementById('text');
	const formUrlInput =  document.getElementById('url');
	if (formTitleInput.value !== "") {
		formUrlInput.required = false;
		formUrlInput.parentElement.disabled = true;
	} else if (formTextInput.value !== "") {
		formUrlInput.required = false;
		formUrlInput.parentElement.disabled = true;
	} else {
		formUrlInput.required = true;
		formUrlInput.parentElement.disabled = false;
	}
}

function disableText() {
	const formTitleInput =  document.getElementById('title');
	const formTextInput =  document.getElementById('text');
	const formUrlInput =  document.getElementById('url');
	if (formUrlInput.value !== "") {
		formTitleInput.required = false;
		formTitleInput.parentElement.disabled = true;
		formTextInput.required = false;
		formTextInput.parentElement.disabled = true;
	} else {
		formTitleInput.required = true;
		formTitleInput.parentElement.disabled = false;
		formTextInput.required = false;
		formTextInput.parentElement.disabled = false;
	}
}

export { disableUrl, disableText }