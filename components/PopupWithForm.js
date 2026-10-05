import Popup from "./Popup.js";
// All the popup logic like closing and opening the popup,
// setting the evt listeners that control opening and closing are inherited
// from the Popup class.
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    // Store the external callback that decides what to do with submitted data.
    this._handleFormSubmit = handleFormSubmit;

    // Store the form and its inputs because this form popup reuses them.
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button-submit");
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    // console.log(inputValues);
    // Build an object from the form's current input values.
    // Each input's `name` becomes an object key, and its `value` becomes
    // that property's value. This collects every input, not only changed ones.
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
      // console.log(`${input.name}:  ${input.value}`);
    });
    // console.log(this._inputList);
    // console.log(this._popup);
    return inputValues;
  }

  setInputValues(values) {
    // Match each form input to a property in `values` using the input's `name`.
    // Example: an input named "description" reads values["description"].
    // If that property is defined, use its value to prefill the input;
    // otherwise, leave the input unchanged.
    this._inputList.forEach((input) => {
      // console.log(input);
      if (values[input.name] !== undefined) {
        input.value = values[input.name];
      }
    });
  }

  setEventListeners() {
    // PopupWithForm handles the submit event, collects clean form data, then
    // sends that data to the callback from index.js.
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    // Reuse the parent listeners for close button, overlay, and Escape behavior.
    super.setEventListeners();
  }

  renderLoadingState(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Guardando..."
      : this._submitButtonDefaultText;
  }

  close() {
    // Reuse parent close behavior, then reset this form.
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
