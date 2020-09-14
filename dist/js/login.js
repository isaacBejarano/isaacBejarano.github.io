/* DOM refs */
const loginForm = document.forms["abrir_form"]; // []
const loginEmail = loginForm.elements["abrir_email"];
const loginPassword = loginForm.elements["abrir_password"];
// etc...

/* UTILITY */
const eyeIcon = document.querySelector(".eye span i");
let eyeState = false;

/* LISTENERS */
eyeIcon.addEventListener("click", showPassword); // eye - utility
loginForm.addEventListener("submit", validateBeforeSubmit); // <form> - validate submit
loginForm.addEventListener("blur", validateOnInputBlur, true); // useCapture / <input> - validate blur

// -> utility: eye default on
showPassword();

/* VALIDATION */
// <form> - validatie submit
function validateBeforeSubmit(e) {
	let errorCount = 0;

	// 1. RROR CHECK UP (add warning feedback and .invalid-tooltip)
	// 1.1 -> email
	if (loginEmail.value === "") {
		let feedback = document.querySelector(`[name = ${loginEmail.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "correo electrónico" es obligatorio';

		loginEmail.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
	} else {
		let regex = RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
		let feedback = document.querySelector(`[name = ${loginEmail.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>

		if (!regex.test(loginEmail.value)) {
			feedback.textContent = "El correo electrónico no cumple el formato";
			loginEmail.classList.add("is-invalid"); // <div .invalid-tooltip>
			errorCount++;
		}
	}

	// 1.2 -> password
	if (loginPassword.value === "") {
		let feedback = document.querySelector(`[name = ${loginPassword.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "contraseña" es obligatorio';

		loginPassword.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
	} else {
		let regex = RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/);
		let feedback = document.querySelector(`[name = ${loginPassword.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>

		if (!regex.test(loginPassword.value)) {
			feedback.textContent = "La contraseña debe tener mínimo 9 carácteres";
			loginPassword.classList.add("is-invalid"); // <div .invalid-tooltip>
			errorCount++;
		}
	}
	// etc...

	// 2. SUBMIT... or not Submit, that is the question :)
	return errorCount > 0
		? (e.stopPropagation(), e.preventDefault())
		: alert('Funcionalidad "Registrarse" en desarrollo. Disponible próximamente.');
}

// <input> - validate blur
function validateOnInputBlur(e) {
	if (e.target.value !== "") e.target.classList.remove("is-invalid");
}

/* UTILITY */
function showPassword() {
	eyeState = !eyeState; // toggle eye state

	// toogle icon + input type
	eyeState
		? ((loginPassword.type = "password"), eyeIcon.classList.remove("fa-eye-slash"), eyeIcon.classList.add("fa-eye"))
		: ((loginPassword.type = "text"), eyeIcon.classList.remove("fa-eye"), eyeIcon.classList.add("fa-eye-slash"));
}
