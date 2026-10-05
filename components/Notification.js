class NotificationToast {
  constructor(notificationSelector) {
    this._toast = document.querySelector(notificationSelector);
    this._closeButton = this._toast.querySelector(".notification__close");
    this._messageContainer = this._toast.querySelector(
      ".notification__message",
    );
    this._hideTimeout = null;
  }

  _clearHideTimeout() {
    if (this._hideTimeout !== null) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
  }

  _fillErrorMessage(errorMessage) {
    this._messageContainer.textContent = errorMessage;
  }

  displayErrorNotification(errorMessage) {
    this._clearHideTimeout();

    this._fillErrorMessage(errorMessage);
    this._toast.classList.add("notification_is-visible");

    this._hideTimeout = setTimeout(() => {
      this.hideErrorNotification();
    }, 2500);
  }

  hideErrorNotification() {
    this._clearHideTimeout();
    this._toast.classList.remove("notification_is-visible");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.hideErrorNotification();
    });
  }
}

export default NotificationToast;
