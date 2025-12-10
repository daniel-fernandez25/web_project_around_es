// DOM elements selction

import { openModal, closeModal } from "./Utils.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const imagePopupModal = document.querySelector("#image-popup");
// const imageModalClose = imagePopupModal.querySelector(".popup__close");

class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
  }

  // gets the card template
  _getTemplate() {
    const HtmlTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return HtmlTemplate;
  }

  _fillCardModalInfo(card, title, image) {
    card.querySelector(".popup__image").src = image;
    card.querySelector(".popup__caption").textContent = title;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._fillCardModalInfo(imagePopupModal, this._name, this._image),
        openModal(imagePopupModal);
    });

    // handled from utils for all modals
    // need to fix simetry
    // imageModalClose.addEventListener("click", () =>
    //   closeModal(imagePopupModal)
    // );
  }
}

class DefaultCard extends Card {
  constructor(data, templateSelector) {
    super(templateSelector);
    this._name = data.name;
    this._image = data.link;
  }

  // selects elements as card properties and updates card info
  _updateInfo() {
    // selects card template and clones it
    this._cardElement = super._getTemplate();
    // selects card elements
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    // updates card elements info
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;

    this._likeButton = this._cardElement.querySelector(".card__like-button"); // selects like button
    this._removeButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    return this._cardElement;
  }

  _setEventListeners() {
    super._setEventListeners(); // calls parent method

    this._likeButton.addEventListener("click", () => this._like()); // adds like functionality
    this._removeButton.addEventListener("click", () => this._removeCard()); // adds remove functionality
  }

  _like() {
    this._likeButton.classList.toggle("card__like-button_is-active"); // toggles appearance
  }

  _removeCard() {
    console.log(this._cardElement);
    this._cardElement.remove();
  }

  generateCard() {
    const card = this._updateInfo();
    this._setEventListeners();
    return card;
  }
}

export { DefaultCard, initialCards };
