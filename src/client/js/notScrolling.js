function notScrolling(action) {
	if (!action || typeof action !== 'function') return;
	let isScrolling;
	window.addEventListener('scroll', function (event){
		window.clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			action();
		}, 6000);
	}, false);
};

export { notScrolling };