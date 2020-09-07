/* DOM refs */
// 1. <form #loginform>
// 2. <input #email>
// 3. <input #password>
// 4. <div #eye>

/* GLOBALS */
const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexPassword = new RegExp(/^([\w!-\/:-@\[-`{-~ªº€·¿~¬çÇ¨´]){9,}/); // alphanumeric case insensitive with length >= 9
let eyeState = false; // eye state

/* LISTENERS */
loginform.addEventListener("submit", validateFormSubmit); // --logic
email.addEventListener("blur", () => validateEmail(email)); // --style
password.addEventListener("blur", () => validatePassword(password)); // --style
eye.addEventListener("click", showPassword); // --utility

/* VALIDATION --style */

// <input #email>
function validateEmail(ref) {
    toolipInput(ref, ref.value.length === 0); // compulsory
    testRegex(regexEmail, email); // RegExp email format
}

// <input #password>
function validatePassword(ref) {
    toolipInput(ref, ref.value.length === 0); // compulsory
    testRegex(regexPassword, password); // RegExp password length
}

/* VALIDATION --logic */

// <form #loginform>
function validateFormSubmit(e) {
    validateEmail(email); // <input #email> --style
    validatePassword(password); // <input #password> --style

    // --logic
    email.value.length === 0 ||
        password.value.length === 0 ||
        !regexEmail.test(email.value) ||
        !regexPassword.test(password.value) ?
        (e.stopPropagation(), e.preventDefault()) :
        (alert(`Funcionalidad "Abrir Sesión" en desarrollo.\
        \nDisponible próximamente ;)`),
            true);
}

/* UTILITY */

// <div #eye>
function showPassword() {
    let eyeOpen = document.querySelector("#eye span i:nth-child(1)");
    let eyeClosed = document.querySelector("#eye span i:nth-child(2)");

    eyeState = !eyeState; // toggle eye state

    eyeState
        ?
        eyeToggle(eyeClosed, eyeOpen, "text") :
        eyeToggle(eyeOpen, eyeClosed, "password");
}

/* AUXILIARY */

// --utility
function eyeToggle(eye1, eye2, type) {
    eye1.classList.remove("hide-eye");
    eye2.classList.add("hide-eye");
    password.type = type; // <input #password>
}

// --validation --stye
function toolipInput(ref, condition) {
    condition
        ?
        (ref.classList.remove("is-valid"), ref.classList.add("is-invalid")) :
        ref.classList.remove("is-invalid");
}

function testRegex(regex, element) {
    regex.test(element.value) ?
        ($(`#${element.id}`).tooltip("disable"),
            element.classList.add("is-valid")) :
        $(`#${element.id}`).tooltip("show");
}