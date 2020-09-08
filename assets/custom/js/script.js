/* ################################################### */
/* ============= Dynamic Form Validation ============= */
/* ################################################### */

// Input fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');

// Form
const form = document.getElementById('registration-form');

// Validation colors
const greenColor = '#28a745';
const redColor = '#dc3545';


// add event listeners
nameField.addEventListener('focusout', validateName);
emailField.addEventListener('focusout', validateEmail);
passwordField.addEventListener('focusout', validatePassword);
confirmPasswordField.addEventListener('focusout', validateConfirmPassword);


const container = document.querySelector('.container .row > div');
const message = document.createElement('div');
container.appendChild(message);
// Handle form
form.addEventListener('submit', function(event) {
    // Prevent default behaviour
    event.preventDefault();
    const name = nameField.value;
    if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()) {
        message.className = 'alert alert-success rounded-0 mt-1';
        message.textContent = `Sign up successful, welcome ${name}`;
    }
    else {
        message.className = 'alert alert-danger rounded-0 mt-1';
        message.textContent = 'Make sure all fields are valid'
    }
});


// Validators
function validateName() {
    // check if is empty
    if (checkIfEmpty(nameField)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(nameField)) return;
    return true;
}

function validateEmail() {
    if (checkIfEmpty(emailField)) return;
    if (!containsCharacters(emailField, 5)) return;
    return true;
}

function validatePassword() {
    // Empty check
    if (checkIfEmpty(passwordField)) return;
    // Must of in certain length
    if (!meetLength(passwordField, 4, 100)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    // if (!containsCharacters(passwordField, 4)) return;
    return true;
}

function validateConfirmPassword() {
    if (!passwordField.classList.contains('is-valid')) {
        setValidation(confirmPasswordField, 'invalid', 'Password must be valid');
        return;
    }
    // If they match
    if (passwordField.value !== confirmPasswordField.value) {
        setValidation(confirmPasswordField, 'invalid', 'Passwords must match');
        return;
    } else {
        setValidation(confirmPasswordField, 'valid', '');
    }
    return true;
}


// Utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        setValidation(field, 'invalid', `${field.name} must not be empty`);
      return true;
    } else {
        setValidation(field, 'valid', '');
        return false;
    }
}

function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValidation(field, 'valid', '');
        return true;
    } else {
        setValidation(field, 'invalid', `${field.name} must contain only letters`);
        return false;
    }
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValidation(field, 'valid', '');
        return true;
    } else if (field.value.length < minLength) {
        setValidation(field, 'invalid', `${field.name} must be at least ${minLength} characters long`);
        return false;
    } else {
        setValidation(field, 'invalid', `${field.name} must be shorter than ${maxLength} characters`);
        return false;
    }
  }

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
      case 1:
        // letters
        regEx = /(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, 'Must contain at least one letter');
      case 2:
        // letter and numbers
        regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, 'Must contain at least one letter and one number');
      case 3:
        // uppercase, lowercase and number
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        return matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase letter and one number');
      case 4:
        // uppercase, lowercase, number and special char
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        return matchWithRegEx(regEx,field, 'Must contain at least one uppercase, one lowercase letter, one number and one special character');
      case 5:
        // Email pattern
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return matchWithRegEx(regEx, field, 'Must be a valid email address');
      default:
        return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
      setValidation(field, 'valid', '');
      return true;
    } else {
        setValidation(field, 'invalid', message);
        return false;
    }
}  

function setValidation(field, status, message){
    let regex = /(is-\w*)/;
    let str = field.className;
    let helpElement = findHelpElement(field);
    if (status === 'valid') {
        if (regex.test(str)){
            let newClass = str.replace(regex, 'is-valid');
            field.className = newClass;
        }
        else {
            field.classList.add('is-valid');
        }
        initializeHelpText(helpElement, message, greenColor, 'none');
    }
    else {
        if (regex.test(str)){
            let newClass = str.replace(regex, 'is-invalid');
            field.className = newClass;
        }
        else {
            field.classList.add('is-invalid');
        }
        initializeHelpText(helpElement, message, redColor, 'block');
    }
}

function findHelpElement(elm){
    return elm.parentElement.nextElementSibling;
}

function initializeHelpText(helpElm, msg, colorProperty, displayProperty){
    helpElm.textContent = msg;
    helpElm.style.color = colorProperty;
    helpElm.style.display = displayProperty;
}