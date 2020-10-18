const VOLUNTEER_COUNT_FORM_SELECTOR = "#volunteerCountForm";
const INVITATION_FORM_SELECTOR = "#invitationForm";

// Array of form records
// Each item of the array is a record with the volunteer's name
// and the details of their invitation
let formRecords = [];

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

document.querySelector(VOLUNTEER_COUNT_FORM_SELECTOR).addEventListener(
  "submit",
  formHandler(() => {
    const formData = getFormData(VOLUNTEER_COUNT_FORM_SELECTOR);
    const volunteerCount = Number(formData.volunteerCount);

    // Construct HTML fields for each volunteer and inject it into the DOM
    document.querySelector("#volunteers").innerHTML = `
    <hr />
    ${Array.from({ length: volunteerCount })
      .map(
        (_, i) => `
      <label for="recipientName${i}">Recipient #${i + 1}'s name:</label>
      <input
        type="text"
        name="recipientName${i}"
        placeholder="Enter your Recipient Name"
      />
    `
      )
      .join("")}
    <hr />
  `;
  })
);

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

function handleFormData(formData) {
  const volunteers = [];
  const details = {};

  for (let [key, value] of Object.entries(formData)) {
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
  formRecords = volunteers.map((recipientName) => ({
    recipientName,
    ...details,
  }));
}

/**
 * Generates the HTML for an invitation given a form record
 * @param {*} record
 * @returns string
 */
function createInvitationHTML(record) {
  return `
    <br />
    <article>
      Hello ${record.recipientName}!
      <br />
      <br />
      You have been invited to volunteer for an event held by
      ${record.organizationName} on ${record.eventDate}.
      Please come to the following website: ${record.websiteURL} to sign up as a
      volunteer.
      <br />
      <br />
      Thanks!
      <br />
      <br />
      ${record.hostName}
    </article>
  `;
}

invitationFormElement.addEventListener(
  "submit",
  formHandler(() => {
    const formData = getFormData(INVITATION_FORM_SELECTOR);
    handleFormData(formData);

    // Construct HTML for each invitation, then inject it into the DOM
    document.querySelector("#invitations").innerHTML = formRecords
      .map(createInvitationHTML)
      .join("");
  })
);
