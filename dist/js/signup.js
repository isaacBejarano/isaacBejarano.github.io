/* DOM refs */
const signupForm = document.forms["registro_form"]; // []
const signupEmail = signupForm.elements["registro_email"];
const signupPassword = signupForm.elements["registro_password"];
const signupPasswordConfirm = signupForm.elements["registro_password_confirm"];
const signupProvincia = signupForm.elements["registro_provincia"];
const eyeIcons = document.querySelectorAll(".eye span i"); // []

/* GLOBALS */
let eye1State = false;
let eye2State = false;
showPassword(eyeIcons[0]); // default open
showPassword(eyeIcons[1]); // default open

/* LISTENERS */
signupEmail.addEventListener("blur", function () {
	validateInput(this);
});
signupPassword.addEventListener("blur", function () {
	validateInput(this);
});
signupPasswordConfirm.addEventListener("blur", function () {
	validateInput(this);
});
signupProvincia.addEventListener("blur", function () {
	validateInput(this);
});
for (eyeIcon of eyeIcons) {
	eyeIcon.addEventListener("click", function () {
		showPassword(this);
	});
}
signupForm.addEventListener("submit", validateBeforeSubmit);

/* VALIDATION */
// Form Element -> CSS + Validity State
function validateInput(ref) {
	const feedback = document.querySelector(`[name = ${ref.name}] ~ div.invalid-feedback`);
	let msgError = ""; // default valid
	let regex = /^(?!x)x$/; // default impossible -> regex.test(ref.value) => false

	// 1. FORM ELEMENTS -> update regex + feedback msg
	if (ref.name === "registro_email") {
		// email -> like user@email.co.uk
		regex = RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
		msgError =
			"El correo electrónico debe seguir el formato correcto (ejemplo. micuenta@email.com)";
	}
	if (ref.name === "registro_password") {
		// password -> case insensitive && length >= 9
		regex = RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/);
		msgError = "La contraseña es obligatoria y debe tener mínimo 9 carácteres";
	}
	if (ref.name === "registro_password_confirm") {
		// confirm -> matches password
		if (signupPassword.value === ref.value) regex = /\w/; // match all strings
		msgError = 'El campo "Contraseña" y "Confirmar Contraseña" deben coincidir';
	}
	if (ref.name === "registro_provincia") {
		// province -> select option
		if (ref.value > 0) regex = /\w/; // match all strings
		msgError = "La provinvia es obligatoria. Selecciona la tuya";
	}
	// if(ref.name ===...) etc...

	// 2. FORM ELEMENT -> CSS
	// feedback msg
	feedback.textContent = regex.test(ref.value) ? "" : msgError;

	// tooltip
	ref.classList.remove(regex.test(ref.value) ? "is-invalid" : "is-valid");
	ref.classList.add(regex.test(ref.value) ? "is-valid" : "is-invalid");

	// 3. FORM ELEMENT -> Validity State: boolean
	return regex.test(ref.value);
}

// Form -> validate
function validateBeforeSubmit(e) {
	let validFormElements = 0;
	const totalFormElements = signupForm.elements.length - 1; // exclude "submit" input/button

	// input state update
	validFormElements = validateInput(signupEmail) ? 1 : 0;
	validFormElements += validateInput(signupPassword) ? 1 : 0;
	validFormElements += validateInput(signupPasswordConfirm) ? 1 : 0;
	validFormElements += validateInput(signupProvincia) ? 1 : 0;
	// validFormElements += etc...

	// submit
	validFormElements !== totalFormElements
		? (e.stopPropagation(), e.preventDefault())
		: alert('Funcionalidad "Registrarse" en desarrollo. Disponible próximamente.');
}

/* UTILITY */
function showPassword(eyeIcon) {
	let targetElement = {};
	let eyeState = false; // scoped state

	// check eyeIcon index
	if (eyeIcon === eyeIcons[0]) {
		eye1State = !eye1State; // toggle eye state
		eyeState = eye1State; // scoped <- global
		targetElement = signupPassword; // {} ref
	}
	if (eyeIcon === eyeIcons[1]) {
		eye2State = !eye2State; // toggle eye state
		eyeState = eye2State; // scoped <- global
		targetElement = signupPasswordConfirm; // {} ref
	}

	// toogle icon + input type
	eyeState
		? ((targetElement.type = "password"),
		  eyeIcon.classList.remove("fa-eye-slash"),
		  eyeIcon.classList.add("fa-eye"))
		: ((targetElement.type = "text"),
		  eyeIcon.classList.remove("fa-eye"),
		  eyeIcon.classList.add("fa-eye-slash"));
}
