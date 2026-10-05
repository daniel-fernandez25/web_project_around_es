class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    // Store this card's data.
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._owner = data.owner;

    // Store the template selector and the external image-click callback.
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    // Clone a fresh card element from the HTML template.
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getId() {
    return this._id;
  }

  _validateOwnership(userId) {
    if (this._owner !== userId) {
      console.log(this._owner);
      this._deleteButton.style.display = "none";
    }
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
      this._handleDeleteClick();
    });
  }

  removeCardFDOM() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    // this just passes the necessary info to handle the user action
    // the handler is stored in the constructor.
    this._handleLikeClick({ id: this._id, liked: this._isLiked });
  }

  updateLike(serverIsLiked) {
    this._isLiked = serverIsLiked;
    if (serverIsLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
      console.log("like added");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
      console.log("like removed");
    }
  }

  generateCard(userId) {
    // Create the DOM element and store the child elements this class controls.
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );

    // Fill the card with its data.
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // render the correct is Liked visual value from initial cards
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }
    // console.log(this._id);
    // console.log(this);
    this._setEventListeners();

    this._validateOwnership(userId);
    // console.log(userId);
    // Return the completed card so Section can add it to the page.
    return this._cardElement;
  }
}

export default Card;
