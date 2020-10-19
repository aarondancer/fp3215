// #region Validators

/*
  Validator type signature:
  (value: string, formValues: { [key: string]: string | number | boolean }) => true | string;
*/

/**
 * Constructs a validator for regex
 *
 * @param {*} regex
 * @param {*} message
 */
const regexValidator = (regex, message) => (value) =>
  regex.test(value) || message;

const usernameValidator = regexValidator(
  /[A-Z0-9]+$/i,
  "Username must only contain letters and numbers"
);

const passwordValidator = regexValidator(
  /.{8,}$/i,
  "Password must be a minimum of 8 characters"
);

const emailValidator = regexValidator(
  /([A-Z0-9._-]+@[A-Z0-9._-]+\.[A-Z0-9]+)\w+/i,
  "Email is not valid"
);

const phoneValidator = regexValidator(
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
  "Phone number is invalid"
);

/**
 * Fails validation if value is empty
 *
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
const fields = {
  userName: [requiredValidator, usernameValidator],
  password: [requiredValidator, passwordValidator],
  passwordVerify: [
    requiredValidator,
    matchValidator("password", "Passwords do not match"),
  ],
  firstName: [requiredValidator],
  lastName: [requiredValidator],
  email: [requiredValidator, emailValidator],
  phoneNumber: [requiredValidator, phoneValidator],
  signUpNewsletter: [
    requiredValidator,
    oneOfValidator(["Yes", "No"], "Select Yes or No"),
  ],
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
}

/**
 * Validates the registration form
 */
function validateForm() {
  const formData = getFormData("#registrationForm");

  Object.entries(formData).forEach(([name, value]) =>
    validateField(name, value, formData)
  );
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", formHandler(validateForm));
