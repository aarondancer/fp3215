const INVITATION_FORM_SELECTOR = "#invitationForm";

function getFormData(formSelector) {
  const formData = new FormData(document.querySelector(formSelector));

  return Object.fromEntries(formData.entries());
}

const invitationFormElement = document.querySelector(INVITATION_FORM_SELECTOR);

invitationFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = getFormData(INVITATION_FORM_SELECTOR);

  for (let [key, value] of Object.entries(formData)) {
    document.querySelector(`#${key}`).textContent = value;
  }
});
