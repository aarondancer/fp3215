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
