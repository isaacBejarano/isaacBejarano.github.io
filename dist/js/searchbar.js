// DOM refs
const navbarFormSM = document.forms["navbar_form_sm"];
const navbarFormLG = document.forms["navbar_form_lg"];
const searchbarSM = navbarFormSM.elements["navbar_searchbar"]; // <input>
const searchbarLG = navbarFormLG.elements["navbar_searchbar"]; // <input>

// LISTENERS
searchbarSM.addEventListener("keyup", function () {
	validateInput(this); // keyup / user may press enter, with no value
});
searchbarLG.addEventListener("keyup", function () {
	validateInput(this); // keyup / user may press enter, with no value
});
navbarFormSM.addEventListener("submit", validateBeforeSubmit); // submit form_lg
navbarFormLG.addEventListener("submit", validateBeforeSubmit); // submit form_lg

/* VALIDATION */
// Form Element -> CSS + Validity State
function validateInput(ref) {
	const feedback = document.querySelector(`#${ref.id} ~ div.invalid-feedback`);
	let msgError = ""; // ~ valid

	// 1. FORM ELEMENT -> search >= 3 chars
	if (ref.value.length < 3) msgError = "Busca palabras de mínimo 3 letras";

	// 2. FORM ELEMENT -> CSS
	// feedback msg
	feedback.textContent = msgError;
	// tooltip
	ref.classList.remove(msgError === "" ? "is-invalid" : "is-valid");
	ref.classList.add(msgError === "" ? "is-valid" : "is-invalid");

	// 3. FORM ELEMENT -> Validity State: boolean
	return msgError === "" ? true : false;
}

// Form -> validate
function validateBeforeSubmit(e) {
	let validForm = false; // default

	// input state update
	if (e.target.name === "navbar_form_sm") validForm = validateInput(searchbarSM);
	if (e.target.name === "navbar_form_lg") validForm = validateInput(searchbarLG);

	// submit
	!validForm
		? (e.stopPropagation(), e.preventDefault())
		: alert('Funcionalidad "Buscar" en desarrollo. Disponible próximamente.');
}
