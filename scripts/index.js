import { DefaultCard, initialCards } from "./Cards.js";
import { openModal, closeModal } from "./utils.js";
import { FormValidator, config } from "./FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

// container where the cards will live.
const cardsContainer = document.querySelector(".cards__list");
// new card();
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardForm = addCardModal.querySelector("#new-card-form");
const cardNameInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_card-name",
);
const cardLinkInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_url",
);

// testing the popup class
// const formPopup = new Popup("#new-card-popup");
// formPopup.setEventListeners();
// addCardBtn.addEventListener("click", () => formPopup.open());

addCardBtn.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);

// instanciating the card class to render initial items
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new DefaultCard(item, "#card-template");
      const cardDOMElement = card.generateCard();
      cardsContainer.append(cardDOMElement);
    },
  },
  ".cards__list",
);

cardSection.renderInitialItems();

function handleCardFormSubmit(e) {
  e.preventDefault();
  const cardInfo = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(cardInfo);
  // closeModal(addCardModal);
  formPopup.close();
}

function renderCard(info) {
  const card = new DefaultCard(info, "#card-template");
  const cardDOMElement = card.generateCard();
  const cardsContainer = document.querySelector(".cards__list");
  cardsContainer.append(cardDOMElement);
}

// // render initial cards using functions
// initialCards.forEach((item) => {
//   const card = new DefaultCard(item, "#card-template");
//   const cardDOMElement = card.generateCard();
//   cardsContainer.append(cardDOMElement);
// });

//enable forms validation
const profileForm = new FormValidator(config, "#edit-profile-form");
profileForm.setEventListeners();
const newCardForm = new FormValidator(config, "#new-card-form");
newCardForm.setEventListeners();
