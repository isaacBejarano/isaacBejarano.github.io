// DOM refs
const signupForm = document.forms["registro_form"]; // []
const signupEmail = signupForm.elements["registro_email"];
const signupPassword = signupForm.elements["registro_password"];
const signupPasswordConfirm = signupForm.elements["registro_password_confirm"];
const signupProvincia = signupForm.elements["registro_provincia"];
// etc...

/* UTILITY */
const signupPasswordEyes = document.querySelectorAll(".eye span i"); // []
let eye1State = false;
let eye2State = false;

/* LISTENERS */
for (eyeIcon of signupPasswordEyes) {
	eyeIcon.addEventListener("click", function () {
		showPassword(this); // eye1, eye2 - utility
	});
}
signupForm.addEventListener("submit", validateBeforeSubmit); // <form> - validate submit
signupForm.addEventListener("blur", validateOnInputBlur, true); // useCapture / <input> - validate blur

// -> utility: eye default on
showPassword(signupPasswordEyes[0]);
showPassword(signupPasswordEyes[1]);

/* VALIDATION */
// <form> - validatie submit
function validateBeforeSubmit(e) {
	let errorCount = 0;
	
	// 1. RROR CHECK UP (add warning feedback and .invalid-tooltip)
	// 1.1 -> email
	if (signupEmail.value === "") {
		let feedback = document.querySelector(`[name = ${signupEmail.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "correo electrónico" es obligatorio';

		signupEmail.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
	} else {
		let regex = RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
		let feedback = document.querySelector(`[name = ${signupEmail.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>

		if (!regex.test(signupEmail.value)) {
			feedback.textContent = "El correo electrónico no cumple el formato";
			signupEmail.classList.add("is-invalid"); // <div .invalid-tooltip>
			errorCount++;
		}
	}

	// 1.2 -> password
	if (signupPassword.value === "") {
		let feedback = document.querySelector(`[name = ${signupPassword.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "contraseña" es obligatorio';

		signupPassword.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
	} else {
		let regex = RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/);
		let feedback = document.querySelector(`[name = ${signupPassword.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>

		if (!regex.test(signupPassword.value)) {
			feedback.textContent = "La contraseña debe tener mínimo 9 carácteres";
			signupPassword.classList.add("is-invalid"); // <div .invalid-tooltip>
			errorCount++;
		}
	}

	// 1.3 -> password confirm
	if (signupPasswordConfirm.value === "") {
		let feedback = document.querySelector(`[name = ${signupPasswordConfirm.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "confirma contraseña" es obligatorio';

		signupPasswordConfirm.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
	} else {
		let feedback = document.querySelector(`[name = ${signupPasswordConfirm.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>

		if (signupPasswordConfirm.value !== signupPassword.value) {
			feedback.textContent = 'El campo "Contraseña" y "Confirmar Contraseña" deben coincidir';
			signupPasswordConfirm.classList.add("is-invalid"); // <div .invalid-tooltip>
			errorCount++;
		}
	}

	// 1.4 -> province
	if (signupProvincia.value === "") {
		let feedback = document.querySelector(`[name = ${signupProvincia.name}] ~ div.invalid-feedback`); // <div .invalid-feedback>
		feedback.textContent = 'El campo "provinvia" es obligatorio';

		signupProvincia.classList.add("is-invalid"); // <div .invalid-tooltip>
		errorCount++;
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

/* AUX -> utility */
function showPassword(eyeIcon) {
	let targetElement = {};
	let eyeState = false; // scoped state

	// check eyeIcon index
	if (eyeIcon === signupPasswordEyes[0]) {
		eye1State = !eye1State; // toggle global eye state
		eyeState = eye1State; // scoped <- global
		targetElement = signupPassword; // {} ref
	}
	if (eyeIcon === signupPasswordEyes[1]) {
		eye2State = !eye2State; // toggle global eye state
		eyeState = eye2State; // scoped <- global
		targetElement = signupPasswordConfirm; // {} ref
	}

	// eyeState => show/hide password
	eyeState
		? ((targetElement.type = "password"), eyeIcon.classList.remove("fa-eye-slash"), eyeIcon.classList.add("fa-eye"))
		: ((targetElement.type = "text"), eyeIcon.classList.remove("fa-eye"), eyeIcon.classList.add("fa-eye-slash"));
}
