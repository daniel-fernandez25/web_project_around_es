import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // popup selector comes from the parent class to help access what's in popup.
    // the image and caption elements from template will be reused,
    // constructor should store elements that are reused when the instance acts.
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    //fills info into the popup
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
