import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    // These DOM elements are reused every time a different card image opens.
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    // The popup is stable, but the image data changes depending on the card
    // clicked, so the data is received by open().
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;

    // Reuse the parent Popup behavior to actually open the popup.
    super.open();
  }
}

export default PopupWithImage;
