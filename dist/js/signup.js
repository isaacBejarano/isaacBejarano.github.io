/* DOM refs */
// 1. <form #loginform>
// 2. <input #email>
// 3. <input #password>
// 4. <input #confirmar>
// 5. <div #eye1>
// 6. <div #eye2>
// 7. <input #provincia>

/* GLOBALS */
const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexPassword = new RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/); // alphanumeric case insensitive with length >= 9
let eyeState = [false, false];

/* LISTENERS */
loginform.addEventListener("submit", validateFormSubmit); // --logic
email.addEventListener("blur", () => validateEmail(email)); // --style
password.addEventListener("blur", () => validatePassword(password)); // --style
confirmar.addEventListener("blur", () => validateConfirmar(confirmar)); // --style
eye1.addEventListener("click", () => showPassword(eye1)); // --utility
eye2.addEventListener("click", () => showPassword(eye2)); // --utility
provincia.addEventListener("blur", () => validateProvincia(provincia)); // --style

/* VALIDATION --style */

// <input #email>
function validateEmail(ref) {
	toolipInput(ref, ref.value.length === 0); // compulsory
	testRegex(regexEmail, ref); // RegExp email format
}

// <input #password>
function validatePassword(ref) {
	toolipInput(ref, ref.value.length === 0); // compulsory
	testRegex(regexPassword, ref); // RegExp password length
}

// <input #confirmar>
function validateConfirmar(ref) {
	toolipInput(ref, ref.value !== password.value); // compulsory
}

function validateProvincia(ref) {
	toolipInput(ref, +ref.value === 0); // compulsory
}

/* VALIDATION --logic */

// <form #loginform>
function validateFormSubmit(e) {
	validateEmail(email); // <input #email> --style
	validatePassword(password); // <input #password> --style
	validateConfirmar(confirmar); // <input #confirmar> --style
	validateProvincia(provincia); // <input #provincia> --style

	// --logic
	email.value.length === 0 ||
	!regexEmail.test(email.value) ||
	password.value.length === 0 ||
	!regexPassword.test(password.value) ||
	password.value !== confirmar.value ||
	+provincia.value === 0 // parse int
		? (e.stopPropagation(), e.preventDefault())
		: (alert(`Funcionalidad "Abrir Sesión" en desarrollo.\
        \nDisponible próximamente ;)`),
		  true);
}

/* UTILITY */

// <div #eye1> || <div #eye2>
function showPassword(eye) {
	let eyeOpen = document.querySelector(`#${eye.id} span i:nth-child(1)`);
	let eyeClosed = document.querySelector(`#${eye.id} span i:nth-child(2)`);

	// toggle eye state
	if (eye.id === "eye1") {
		eyeState[0] = !eyeState[0]; // toggle eye1 state
		eyeState[0]
			? eyeToggle(eyeClosed, eyeOpen, "text", password)
			: eyeToggle(eyeOpen, eyeClosed, "password", password);
	} else if (eye.id === "eye2") {
		eyeState[1] = !eyeState[1]; // toggle eye2 state
		eyeState[1]
			? eyeToggle(eyeClosed, eyeOpen, "text", confirmar)
			: eyeToggle(eyeOpen, eyeClosed, "password", confirmar);
	} else console.warn("eyeState error");
}

/* AUXILIARY */

// --utility
function eyeToggle(eyeA, eyeB, type, id) {
	eyeA.classList.remove("hide-eye");
	eyeB.classList.add("hide-eye");
	id.type = type; // <input #password> || <input #confirmar>
}

// --validation --stye
function toolipInput(ref, condition) {
	condition
		? (ref.classList.remove("is-valid"), ref.classList.add("is-invalid"))
		: ref.classList.remove("is-invalid");
}

function testRegex(regex, element) {
	regex.test(element.value)
		? ($(`#${element.id}`).tooltip("disable"),
		  element.classList.add("is-valid"))
		: $(`#${element.id}`).tooltip("show");
}
