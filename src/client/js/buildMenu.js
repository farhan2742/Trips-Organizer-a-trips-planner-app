function buildMenu() {
	const navList = document.querySelector("#navbar__list");
	const items = document.querySelectorAll(".page__section");
	const fragment = document.createDocumentFragment(); 
	navList.classList.add("nav-menu");
	for (let i = 0; i < items.length; i++) {
		let listItem = document.createElement("li");
		let link = items[i].id;
		let itemText = items[i].getAttribute("data-nav");
		listItem.innerHTML = `<a href="#${link}" class="nav-link">${itemText}</a>`;
		if (i === 0) {
			listItem.classList.add("nav-item", "nav-item", "active");
		} else {
			listItem.classList.add("nav-item", "nav-item");
		}
		fragment.appendChild(listItem);
	}
	navList.appendChild(fragment);
};

export { buildMenu }

 