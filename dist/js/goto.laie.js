// <a .gotobookshop>
let gotobookshops = document.getElementsByClassName("gotobookshop"); // []

// href LAIE []
for (gotobookshop of gotobookshops) {
	gotobookshop.addEventListener("click", e => {
		return confirm(
			"Ir a la página de la librería Laie." +
				"\n" +
				"Esta acción abrirá una nueva ventana."
		)
			? true
			: e.preventDefault();
	});
}
