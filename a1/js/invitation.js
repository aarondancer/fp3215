const INVITATION_FORM_SELECTOR = "#invitationForm";

// Use var instead of let so that they are hoisted to the global context
// This allows us to assign/access using globalThis/window
// Example: globalThis["recipientName"] or window["recipientName"]
// Normally we would use an object instead of individual variables, so that
// This kind of hoisting would not be necessary, and form handling is dynamic
var recipientName;
var organizationName;
var eventDate;
var websiteURL;
var hostName;

/**
 * Retreives form values and returns them in an object
 *
 * @param {*} formSelector - Selector string for form element
 * @retruns { [key: string]: FormDataEntryValue } - Object with form values
 */
function handleFormData(formSelector) {
  const formData = new FormData(document.querySelector(formSelector));

  for (let [key, value] of formData.entries()) {
    // Assign form values to the variables we declared above.
    globalThis[key] = value;
  }
}

const invitationFormElement = document.querySelector(INVITATION_FORM_SELECTOR);

invitationFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = handleFormData(INVITATION_FORM_SELECTOR);

  for (let key of Object.keys(formData)) {
    // globalThis[key] gets the value from the declared variables
    document.querySelector(`#${key}`).textContent = globalThis[key];
  }

  // Alternatively this can be done manually:
  /*
  document.querySelector("#recipientName").textContent = recipientName;
  document.querySelector("#organizationName").textContent = organizationName;
  document.querySelector("#eventDate").textContent = eventDate;
  document.querySelector("#websiteURL").textContent = websiteURL;
  document.querySelector("#hostName").textContent = hostName;
  */
});
