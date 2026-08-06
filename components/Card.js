class Card {
  constructor(data, templateSelector, handleCardClick) {
    // Store this card's data.
    this._name = data.name;
    this._link = data.link;

    // Store the template selector and the external image-click callback.
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // Clone a fresh card element from the HTML template.
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Card does not know how the popup works. It only sends its data to the
    // callback passed from index.js.
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });

    // Toggle the visual like state.
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Remove this card from the DOM.
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  generateCard() {
    // Create the DOM element and store the child elements this class controls.
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");

    // Fill the card with its data.
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    // Return the completed card so Section can add it to the page.
    return this._cardElement;
  }
}

export default Card;
