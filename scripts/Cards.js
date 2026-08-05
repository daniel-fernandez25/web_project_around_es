class Card {
  constructor(data, templateSelector, handleCardClick) {
    // Store the card data received from the initial cards array or from the form
    this._name = data.name;
    this._link = data.link;

    // Store the template selector so the class knows which HTML template to clone
    this._templateSelector = templateSelector;

    // Store the callback that will run when the card image is clicked
    // This keeps Card loosely coupled from PopupWithImage
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // Find the template in the DOM, clone its card element, and return a new card
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // When the image is clicked, send this card's data to the external callback
    // Card does not open the popup directly
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });

    // Toggle the like button state
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Remove the card from the page
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeButton() {
    // Add or remove the active like class
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    // Remove this card element from the DOM
    this._cardElement.remove();
  }

  generateCard() {
    // Create a new card element from the template
    this._cardElement = this._getTemplate();

    // Store the card elements that will be updated or reused
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );

    // Fill the card with its data
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Add all card event listeners
    this._setEventListeners();

    // Return the completed card so it can be added to the page
    return this._cardElement;
  }
}

export default Card;
