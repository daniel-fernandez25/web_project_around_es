const config = {
  inputSelector: ".popup__input", // check
  submitButton: ".popup__button-submit", // check
  inputErrorClass: "form__input_type-error", // check (red)
  activeErrorClass: "form__input-error-active",
};

class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButton = config.submitButton;
    this._inputErrorClass = config.inputErrorClass;
    this._activeErrorClass = config.activeErrorClass;
    this._formElement = document.querySelector(form);
    this._inputs = this._formElement.querySelectorAll(this._inputSelector);
    this._button = this._formElement.querySelector(this._submitButton);
  }

  _showInputError(input) {
    // adding a red border to the input field.
    input.classList.add(this._inputErrorClass);
    // selecting the <span> tag associated with the input
    // which will contain the error message
    const errorSpan = this._formElement.querySelector(
      `.${input.id}-input-error`
    );
    // adding the error message to the <span>
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._activeErrorClass);
  }
  _hideInputError(input) {
    const errorSpan = this._formElement.querySelector(
      `.${input.id}-input-error`
    );
    // removing the red border from the field
    input.classList.remove(this._inputErrorClass);
    // cleaning error message from span
    errorSpan.textContent = "";
    // removing the class that makes the span visible
    errorSpan.classList.remove(this._activeErrorClass);
  }

  _checkInputsValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    const allValid = Array.from(this._inputs).every(
      (input) => input.validity.valid
    );
    this._button.disabled = !allValid;
  }

  _resetForm(form) {
    // loops through the form elements and hides the span tags
    this._inputs.forEach((input) => {
      // console.log(element);
      this._hideInputError(input);
    });
    // reset form, important for add card modal
    form.reset();
  }

  enableValidation(input) {
    this._checkInputsValidity(input);
    this._toggleButtonState();
  }

  setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => this.enableValidation(input));
    });
  }
}

export { FormValidator, config };
