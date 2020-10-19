// Sets the form value by name
function setFormValue(name, value) {
  const els = document.getElementsByName(name);

  if (els.length !== 0) {
    els[0].value = value;
  }
}

// Sets the form value by name for a radio button group
function setRadioValue(name, value) {
  const els = Array.from(document.getElementsByName(name));

  els.forEach((el) => {
    el.checked = el.value === value;
  });
}

// Satisfies: "Create an interests.html page with a form that has the fields
// listed above. This interests.html page will read in the input from the query
// string data from the registration.html page and store them into
// hidden input fields."
window.addEventListener("load", () => {
  // Get query params from URL
  const searchParams = new URLSearchParams(window.location.search);

  // Decode query params into plain JS object
  const paramsObj = Array.from(searchParams).reduce(
    (object, [key, value]) => ((object[key] = value), object),
    {}
  );

  // Set form values based on query params
  for (let [key, value] of Object.entries(paramsObj)) {
    if (key === "signUpNewsletter") {
      // Radio buttons need special logic due to them using multiple input tags
      setRadioValue(key, value);
    } else {
      setFormValue(key, value);
    }
  }
});

document.getElementById("interestsForm").addEventListener(
  "submit",
  formHandler(() => {
    const formData = getFormData("#interestsForm");

    // Save the form values into a series of cookies
    // Satisfies: Write a script that runs in response to the submit event,
    // from the interests.html page, that saves the input from both pages to
    // a series of cookies to store each input...
    for (let [key, value] of Object.entries(formData)) {
      setCookie(key, value);
    }

    window.location.href = "confirm.html";
  })
);
