/* DOM refs */
const loginForm = document.forms["abrir_form"]; // []
const loginEmail = loginForm.elements["abrir_email"];
const loginPassword = loginForm.elements["abrir_password"];
const eyeIcon = document.querySelector(".eye span i");

/* GLOBALS */
let eyeState = false;
showPassword(); // default open

/* LISTENERS */
loginEmail.addEventListener("blur", function () {
	validateInput(this);
});
loginPassword.addEventListener("blur", function () {
	validateInput(this);
});
eyeIcon.addEventListener("click", showPassword);
loginForm.addEventListener("submit", validateBeforeSubmit);

/* VALIDATION */
// Form Element -> CSS + Validity State
function validateInput(ref) {
	const feedback = document.querySelector(
		`[name = ${ref.name}] ~ div.invalid-feedback`
	);
	let msgError = ""; // default valid
	let regex = /^(?!x)x$/; // default impossible -> regex.test(ref.value) => false

	// 1. FORM ELEMENTS -> update regex + feedback msg
	if (ref.name === "abrir_email") {
		// email -> like user@email.co.uk
		regex = RegExp(
			/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		);
		msgError =
			"El correo electrónico debe seguir el formato correcto (ejemplo. micuenta@email.com)";
	}
	if (ref.name === "abrir_password") {
		// password -> case insensitive && length >= 9
		regex = RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/);
		msgError = "La contraseña es obligatoria y debe tener mínimo 9 carácteres";
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
	const totalFormElements = loginForm.elements.length - 1; // exclude "submit" input/button

	// input state update
	validFormElements = validateInput(loginEmail) ? 1 : 0;
	validFormElements += validateInput(loginPassword) ? 1 : 0;
	// validFormElements += etc...

	// submit
	validFormElements !== totalFormElements
		? (e.stopPropagation(), e.preventDefault())
		: alert(
				'Funcionalidad "Abrir Sesión" en desarrollo. Disponible próximamente.'
		  );
}

/* UTILITY */
function showPassword() {
	eyeState = !eyeState; // toggle eye state

	// toogle icon + input type
	eyeState
		? ((loginPassword.type = "password"),
		  eyeIcon.classList.remove("fa-eye-slash"),
		  eyeIcon.classList.add("fa-eye"))
		: ((loginPassword.type = "text"),
		  eyeIcon.classList.remove("fa-eye"),
		  eyeIcon.classList.add("fa-eye-slash"));
}
