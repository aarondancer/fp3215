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

  recipientName = formData.get("recipientName");
  organizationName = formData.get("organizationName");
  eventDate = formData.get("eventDate");
  websiteURL = formData.get("websiteURL");
  hostName = formData.get("hostName");

  // Alternatively, this can be done dynamically
  // for (let [key, value] of formData.entries()) {
  //   globalThis[key] = value;
  // }
}

const invitationFormElement = document.querySelector(INVITATION_FORM_SELECTOR);

invitationFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = handleFormData(INVITATION_FORM_SELECTOR);

  document.querySelector("#recipientName").textContent = recipientName;
  document.querySelector("#organizationName").textContent = organizationName;
  document.querySelector("#eventDate").textContent = eventDate;
  document.querySelector("#websiteURL").textContent = websiteURL;
  document.querySelector("#hostName").textContent = hostName;

  // Alternatively this can be done dynamically:
  // for (let key of Object.keys(formData)) {
  //   document.querySelector(`#${key}`).textContent = globalThis[key];
  // }

  // My original implementation
  // This didn't meet the requirements as it doesn't declare variables
  // for the form fields
  /*
    e.preventDefault();
    const formData = new FormData(document.querySelector("#invitationForm"));
    for (let [key, value] of formData.entries()) {
      document.querySelector(`#${key}`).textContent = value;
    }
  */
});
