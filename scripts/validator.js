// ===========================
//      FORM VALIDATION
// ===========================

// selecting all forms
const forms = document.querySelectorAll("form");

// show and hide error messages

function showInputError(inputElement, errorMessage, form) {
  // selecting the <span> tag associated with the input
  // which will contain the error message
  const errorSpan = form.querySelector(`.${inputElement.id}-input-error`);
  // adding a red border to the input field.
  inputElement.classList.add("form__input_type-error");
  // adding the error message to the <span>
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add("form__input-error-active");
  // making it visible
  errorSpan.classList.add("form__input-error");
}

function hideInputError(inputElement, form) {
  // selecting the <span> tag associated with the input
  // to remove the error message
  const errorSpan = form.querySelector(`.${inputElement.id}-input-error`);
  // removing the red border to the field
  inputElement.classList.remove("form__input_type-error");
  // removing the class that makes the span visible
  errorSpan.classList.remove("form__input-error-active");
  // removing the error message to make the span invisible again
  errorSpan.textContent = "";
}

// enabling or disabling the submit button from validating each input

function toggleButtonState(inputsList, button) {
  // Convert the NodeList (inputs) into an array and check if *every* field is valid.
  // every returns true if all inputs validity is valid
  const allValid = Array.from(inputsList).every(
    (input) => input.validity.valid
  );
  // Disable the button if not all inputs are valid, enable it otherwise.
  button.disabled = !allValid;
}

// ============================================================
// looping through forms to apply logic to each selected form
// ============================================================

forms.forEach((form) => {
  // selecting form inputs
  const inputs = form.querySelectorAll(".popup__input");
  // console.log(inputs);

  // selecting form submit button
  const submitButton = form.querySelector(".popup__button-submit");
  // console.log(submitButton.textContent);

  // looping inputs and adding event listeners to validate fields as inputs occur
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      // if the input is not valid shows an error message
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage, form);
      } else {
        hideInputError(input, form);
      }
      console.log(input.value);
      console.log(input.validationMessage);
      // After every change, re-check the whole form validity and update the button state
      toggleButtonState(inputs, submitButton);
    });
  });
});

// resets validation
function resetForm(formModal) {
  // selecting items
  const form = formModal.querySelector(".popup__form");
  const elementsList = form.querySelectorAll(".popup__input");

  // loops through the form elements and hides the span tags
  elementsList.forEach((element) => {
    // console.log(element);
    hideInputError(element, form);
  });
  // reset form, important for add card modal
  form.reset();
}
