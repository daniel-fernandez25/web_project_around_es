import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    // Store the external callback that decides what to do with submitted data.
    this._handleFormSubmit = handleFormSubmit;

    // Store the form and its inputs because this form popup reuses them.
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};

    // Use each input's name attribute as the object key.
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(values) {
    // Optional helper used for edit-profile: it fills the form before opening.
    this._inputList.forEach((input) => {
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

  close() {
    // Reuse parent close behavior, then reset this form.
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
