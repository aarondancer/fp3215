const VOLUNTEER_COUNT_FORM_SELECTOR = "#volunteerCountForm";
const INVITATION_FORM_SELECTOR = "#invitationForm";

// Array of invitation records
// Each item of the array is a record with the volunteer's name
// and the details of their invitation.
let invitations = [];

// Keep track of the current volunteer count for reconciliation
let currentVolunteerCount = 0;

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
 * Creates a number of name fields based on the number of volunteers entered
 * This is a destructive process. Changing the value will clear all of the name
 * field avlues.
 *
 * The requirements did not specify that the values needed to be preserved.
 */
function createVolunteerFields() {
  const formData = getFormData(VOLUNTEER_COUNT_FORM_SELECTOR);
  const volunteerCount = Number(formData.volunteerCount);

  // If the number of volunteers entered is the same as before, do nothing
  if (currentVolunteerCount !== volunteerCount) {
    currentVolunteerCount = volunteerCount;
    let volunteersHtml = "";

    // Construct HTML fields for each volunteer and inject it into the DOM
    for (let i = 0; i < volunteerCount; i += 1) {
      volunteersHtml += `
      <label for="recipientName${i}">Recipient #${i + 1}'s name:</label>
      <input
        type="text"
        name="recipientName${i}"
        placeholder="Enter your Recipient Name"
      />
    `;
    }
    document.querySelector("#volunteers").innerHTML = `
    <hr />
    ${volunteersHtml}
    <hr />
  `;
  }
}

const invitationFormElement = document.querySelector(INVITATION_FORM_SELECTOR);
const recipientNameRegex = /recipientName(\d+)/;

/**
 * Gets the index of the recipient if key is valid
 *
 * @param {*} str
 * @returns number | undefined
 */
function getRecipientIndex(str) {
  const result = recipientNameRegex.exec(str);
  return result?.length === 2 ? Number(result[1]) : undefined;
}

/**
 * Generates the HTML for an invitation given a form record
 * @param {*} invitationRecord
 * @returns string
 */
function createInvitationHTML(invitationRecord) {
  return `
    <br />
    <article>
      Hello ${invitationRecord.recipientName}!
      <br />
      <br />
      You have been invited to volunteer for an event held by
      ${invitationRecord.organizationName} on ${invitationRecord.eventDate}.
      Please come to the following website: ${invitationRecord.websiteURL} to
      sign up as a volunteer.
      <br />
      <br />
      Thanks!
      <br />
      <br />
      ${invitationRecord.hostName}
    </article>
  `;
}

/**
 * Loops over the `invitations` array (of records) and injects the constructed
 * HTML into the DOM
 *
 * This satisfies:
 * "Write JavaScript to Loop through the array of records and then display
 * the invitation message for each volunteer. (Unlike a simple array that
 * contains a single variable for each index, an array of records allows us
 * to store related data fields for each index in the array. If we were going
 * to store this in simple arrays, we would need a separate array for each
 * data field.)"
 */
function displayInvitations() {
  const invitationHtml = "";

  for (let invitation of invitations) {
    invitationHtml += createInvitationHTML(invitation);
  }

  document.querySelector("#invitations").innerHTML = invitationHtml;
}

// Add event listener for Volunteer Count Form
// This satisfies: "Once the number of volunteers has been entered
// (by pressing the enter key while the cursor is in the input field),
// use JavaScript to display the volunteer input fields based upon the
// number of volunteers entered."
document
  .querySelector(VOLUNTEER_COUNT_FORM_SELECTOR)
  .addEventListener("submit", formHandler(createVolunteerFields));

invitationFormElement.addEventListener(
  "submit",
  formHandler(() => {
    fromEntries = [];
    const formDataObj = getFormData(INVITATION_FORM_SELECTOR);

    for (let [key, value] of Object.entries(formDataObj)) {
      fromEntries.push({ key, value });
    }

    const volunteers = [];
    const details = {};

    // Loop over each of the form values to get a list of volunteer names
    // Store the other form data in `details`
    for (let [key, value] of Object.entries(formDataObj)) {
      const index = getRecipientIndex(key);

      if (index !== undefined) {
        // It's a recipient name, store it in volunteers
        volunteers[index] = value;
      } else {
        // It's not a recipient name, add it to the invitation details
        details[key] = value;
      }
    }

    // Finally, map the details to each volunteer
    // and assign the records to `formRecords`
    // NOTE: This satisfies "Write JavaScript that stores the form into an array of records once the form is submitted."
    for (let recipientName of volunteers) {
      fromEntries.push({
        recipientName,
        ...details,
      });
    }

    // Display the invitations
    displayInvitations();
  })
);
