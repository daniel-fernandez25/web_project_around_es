const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inputErrorClass: "form__input_type-error",
  activeErrorClass: "form__input-error-active",
};

class FormValidator {
  constructor(config, formSelector) {
    // Store selectors/classes from the validation config.
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._activeErrorClass = config.activeErrorClass;

    // Store the form and its reusable elements.
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._activeErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  resetValidation() {
    // Public helper for resetting errors and button state after programmatic
    // form changes, such as prefilling or closing a popup.
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

export { FormValidator, config };
