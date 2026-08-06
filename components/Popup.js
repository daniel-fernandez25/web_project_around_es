class Popup {
  constructor(popupSelector) {
    // Store the popup element once. The selector is stable for this instance.
    this._popup = document.querySelector(popupSelector);

    // Bind the method so `this` still points to this Popup instance when the
    // browser calls the method later as an event handler.
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Open this popup and start listening for Escape only while it is open.
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // Close this popup and remove the Escape listener to avoid unnecessary
    // listeners when no popup is open.
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // Close this popup when the user presses Escape.
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Use one click listener for both close-button clicks and overlay clicks.
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target === this._popup
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
