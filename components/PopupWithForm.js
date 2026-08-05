import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // popup selector comes from the parent class to help access what's in popup.
    // The controller funct which will be used for handling the submit
    this._handleFormSubmit = handleFormSubmit;
    // storing the form - can be used to store form elements
    this._form = this._popup.querySelector(".popup__form");
    // form input list which will be used to get the user inputs and then send to the call back
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    // The actions to execute when submitting the form will come from
    // a external controller function
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const inputValues = this._getInputValues();
      // this will trigger an action once we have data, e,g,. changing the profile info
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
