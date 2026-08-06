import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator, config } from "../components/FormValidator.js";
import { initialCards } from "./constants.js";

// Buttons that open form popups. The popup classes handle closing internally.
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Form validators. These control input errors and submit-button state.
const editProfileFormValidator = new FormValidator(config, "#edit-profile-form");
const newCardFormValidator = new FormValidator(config, "#new-card-form");
editProfileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

// UserInfo reads and updates the profile text on the page.
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Image popup. Cards will open this through the callback passed to Card.
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function createCard(cardData) {
  // Card receives a callback instead of importing or knowing PopupWithImage.
  const card = new Card(cardData, "#card-template", (clickedCardData) => {
    imagePopup.open(clickedCardData);
  });

  return card.generateCard();
}

// Section renders the initial cards and adds new card elements to the page.
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list",
);

cardSection.renderItems();

// Profile form popup. PopupWithForm collects inputs and sends them here.
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });

  editProfilePopup.close();
  editProfileFormValidator.resetValidation();
});
editProfilePopup.setEventListeners();

// New-card form popup. The form input name is "place-name", so it is mapped
// to the card data shape expected by Card: { name, link }.
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const newCardData = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  cardSection.addItem(createCard(newCardData));
  newCardPopup.close();
  newCardFormValidator.resetValidation();
});
newCardPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  // Prefill the form with the current profile info before opening it.
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});
