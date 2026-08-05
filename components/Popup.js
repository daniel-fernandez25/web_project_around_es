class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayCloseModal = this._overlayCloseModal.bind(this);
  }

  open() {
    console.log("opened from Popup class ");
    console.log(this._popup);
    // opens the popup
    this._popup.classList.add("popup_is-opened");
    // only adds the event listener when the popup opens
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("closed from Popup class ");
    // closes the popup
    this._popup.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    console.log("closed from Popup class ");
    if (evt.key === "Escape") {
      // selects the opened modal and closes it
      this.close();
    }
  }

  _overlayCloseModal(evt) {
    console.log("closed from Popup class ");
    // evt.currentTarget → the element with the listener (the modal)
    // evt.target → the exact element clicked (could be inside the popup)
    const modal = evt.currentTarget;
    // Close only if the user clicks directly on the overlay, not inside the popup
    if (evt.target === modal) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
    this._popup.addEventListener("click", this._overlayCloseModal);
  }
}
export default Popup;
