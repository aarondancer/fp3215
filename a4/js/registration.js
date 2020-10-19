// #region Validators

/*
  Validator type signature:
  (value: string, formValues: { [key: string]: string | number | boolean }) => true | string;
*/

/**
 * Constructs a validator for regex. If the given value is empty, do not validate.
 *
 * @param {*} regex
 * @param {*} message
 */
const regexValidator = (regex, message) => (value) =>
  Boolean(value) === true ? regex.test(value) || message : true;

const usernameValidator = regexValidator(
  /^[A-Z0-9]+$/i,
  "Username must only contain letters and numbers"
);

const passwordValidator = regexValidator(
  /^.{8,}$/i,
  "Password must be a minimum of 8 characters"
);

const emailValidator = regexValidator(
  /^([A-Z0-9._-]+@[A-Z0-9._-]+\.[A-Z0-9]+)\w+/i,
  "Email is not valid"
);

const phoneValidator = regexValidator(
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
  "Phone number is invalid"
);

/**
 * Fails validation if value is empty
 *
 * Satisfies: "Write JavaScript that defines that a field is required and
 * generates an appropriate error message if the field has not been completed."
 * @param {*} value
 */
const requiredValidator = (value) => Boolean(value) || "Required";

/**
 * Fails validation if value does not match other specified form value
 *
 * @param {*} matchFieldName
 * @param {*} message
 */
const matchValidator = (matchFieldName, message) => (value, formValues) =>
  value === formValues[matchFieldName] || message;

/**
 * Fails validation if value does not match one of the passed options
 *
 * @param {*} options
 * @param {*} message
 */
const oneOfValidator = (options, message) => (value) =>
  options.includes(value) || message;

// #endregion

// Validation rules for each form field
// Satisfies: "Write JavaScript that defines that a field is required and
// generates an appropriate error message if the field has not been completed."
// Satisfies: "Write JavaScript to validate all input fields per the formatting
// definitions that the field values should be checked against
// (found in the overview) after each field.""
const fields = {
  userName: [requiredValidator, usernameValidator],
  password: [requiredValidator, passwordValidator],
  passwordVerify: [
    requiredValidator,
    passwordValidator,
    matchValidator("password", "Passwords do not match"),
  ],
  firstName: [requiredValidator],
  lastName: [requiredValidator],
  email: [emailValidator],
  phoneNumber: [phoneValidator],
  signUpNewsletter: [oneOfValidator(["Yes", "No"], "Select Yes or No")],
};

/**
 * Retreives form values and returns them in an object
 *
 * @param {*} formSelector - Selector string for form element
 * @retruns { [key: string]: FormDataEntryValue } - Object with form values
 */
function getFormData(formSelector) {
  const formData = new FormData(document.querySelector(formSelector));
  return Object.fromEntries(formData.entries());
}

/**
 * HOF for preventing default behavior of forms
 *
 * @param {*} fn
 */
function formHandler(fn) {
  return (e) => {
    e.preventDefault();
    fn(e);
  };
}

/**
 * Sets input CSS class based on validation state
 *
 * @param {*} id
 * @param {*} style
 */
function setInputStyle(id, style) {
  const inputEl = document.getElementsByName(id)[0];
  inputEl.className = style;
}

/**
 * Displays / hides error messages based on validation
 *
 * Satisfies: "Write JavaScript that displays an appropriate error
 * correction message (next to the field) in the event a form entry
 * error has been made."
 *
 * @param {*} id
 * @param {*} message
 */
function displayError(id, message = "") {
  const errorEl = document.getElementById(`${id}-error`);
  errorEl.textContent = message;
}

/**
 * Performs validation on a specific field
 *
 * @param {*} name
 * @param {*} value
 * @param {*} formData
 */
function validateField(name, value, formData) {
  let error;

  // Use `Array.prototype.some` to bail once an error is found
  fields[name].some((validator) => {
    const result = validator(value, formData);
    if (result !== true) {
      error = result;
      return true;
    }
    return false;
  });

  setInputStyle(name, error === undefined ? "valid" : "error");
  displayError(name, error);

  return error === undefined;
}

/**
 * Focuses the field given by name
 *
 * @param {*} name
 */
function focusField(name) {
  document.getElementsByName(name)[0].focus();
}

/**
 * Validates the registration form
 */
function validateForm() {
  const formData = getFormData("#registrationForm");
  let firstErrorFieldName;

  Object.entries(formData).forEach(([name, value]) => {
    const result = validateField(name, value, formData);

    if (result !== true && firstErrorFieldName === undefined) {
      firstErrorFieldName = name;
      // Satisfies: "Write a JavaScript that will default the user's cursor to
      // the first erroneous input field in the event that there is an input error."
      focusField(name);
    }
  });

  if (firstErrorFieldName === undefined) {
    // All fields passed validation
    window.location.href = "confirm.html";
  }
}

// Satisfies: "Create a submit button that executes the validation when submitted."
document
  .getElementById("registrationForm")
  .addEventListener("submit", formHandler(validateForm));
