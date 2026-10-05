import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationHandler) {
    super(popupSelector);

    this._confirmationHandler = confirmationHandler;
    // These DOM elements are reused every time a different card image opens.
    this._popupButton = this._popup.querySelector(".popup__button-delete");
    this._submitButton = this._popup.querySelector(".popup__button-submit");
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => {
      this.sendUserConfirmation();
    });
  }

  storeCardReferences(card) {
    this.cardReference = card;
  }

  sendUserConfirmation() {
    this._confirmationHandler(this.cardReference);
  }

  renderDeletingState(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Borrando..."
      : this._submitButtonDefaultText;
  }
}

export default PopupWithConfirmation;
