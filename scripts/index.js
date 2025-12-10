import { DefaultCard, initialCards } from "./Cards.js";
import { openModal, closeModal } from "./Utils.js";
import { FormValidator, config } from "./FormValidator.js";

// container where the cards will live.
const cardsContainer = document.querySelector(".cards__list");
// new card();
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardForm = addCardModal.querySelector("#new-card-form");
const cardNameInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_card-name"
);
const cardLinkInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_url"
);
addCardBtn.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(e) {
  e.preventDefault();
  const cardInfo = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(cardInfo);
  closeModal(addCardModal);
}

function renderCard(info) {
  const card = new DefaultCard(info, "#card-template");
  const cardDOMElement = card.generateCard();
  const cardsContainer = document.querySelector(".cards__list");
  cardsContainer.append(cardDOMElement);
}

// render initial cards
initialCards.forEach((item) => {
  const card = new DefaultCard(item, "#card-template");
  const cardDOMElement = card.generateCard();
  cardsContainer.append(cardDOMElement);
});

//enable forms validation
const profileForm = new FormValidator(config, "#edit-profile-form");
profileForm.setEventListeners();
const newCardForm = new FormValidator(config, "#new-card-form");
newCardForm.setEventListeners();
