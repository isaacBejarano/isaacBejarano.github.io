// DOM refs
// 1. <form #searchbar>
// 2. <form #searchbar><input>

// LISTENERS
searchbar.addEventListener("submit", validateSearchbarLogic); // useCapture bubble
searchbarInput.addEventListener("input", validateSearchbarInputStyle); // useCapture bubble

// VALIDATION --style
function validateSearchbarInputStyle() {
	searchbarInput.value.length <= 3
		? (searchbarInput.classList.remove("is-valid"),
		  searchbarInput.classList.add("is-invalid"))
		: (searchbarInput.classList.remove("is-invalid"),
		  searchbarInput.classList.add("is-valid"));
}

// VALIDATION --logic
function validateSearchbarLogic(e) {
	searchbarInput.value.length <= 3
		? (e.stopPropagation(),
		  e.preventDefault(),
		  searchbarInput.classList.add("is-invalid"))
		: (alert(
				'Funcionalidad "Buscar Título" en desarrollo. \nDisponible próximamente ;)'
		  ),
		  searchbarInput.classList.remove("is-valid"),
		  (searchbarInput.value = ""));
}
