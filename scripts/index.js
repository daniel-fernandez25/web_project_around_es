initialCards = [
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

// initialCards.forEach(function (card) {
//   console.log(card.name);
// });

// selecting edit profile modal and buttons
const profilePageSection = document.querySelector(".profile.page__section"); //profile section page
const editProfileButton = profilePageSection.querySelector(
  ".profile__edit-button"
); // edit profile button
const editProfileModal = document.querySelector("#edit-popup"); // modal itself
const closeProfileSection = editProfileModal.querySelector(".popup__close"); // close (profile modal) button
const nameField = editProfileModal.querySelector(".popup__input_type_name");
const descriptionField = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
// selecting the profile info
const profileName = profilePageSection.querySelector(".profile__title");
const profileDescription = profilePageSection.querySelector(
  ".profile__description"
);

// selecting the cards template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// selecting cards container
const cardsContainer = document.querySelector(".cards__list");

// selecting the open (add card modal) button
const addCardBtn = profilePageSection.querySelector(".profile__add-button");

// A D D  C A R D

// selecting add card modal itself
const addCardModal = document.querySelector("#new-card-popup");

// selecting the close (add card modal) button
const closeAddCardModal = addCardModal.querySelector(".popup__close");

// selecting the card title input
const cardNameInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_card-name"
);
// selecting the card link input
const cardLinkInput = addCardModal.querySelector(
  ".popup__input.popup__input_type_url"
);
//  selecting add card form
const addCardForm = addCardModal.querySelector("#new-card-form");

// O P E N    B I G    I M A G E

// selecting image popup modal
const imgPopupModal = document.querySelector("#image-popup");
// selecting image popup close modal button
const closeImgPopupBtn = imgPopupModal.querySelector(".popup__close");
// selecting modal image
const popupImg = imgPopupModal.querySelector(".popup__image");
// selecting the popup caption (image name later)
const popupCaption = imgPopupModal.querySelector(".popup__caption");

// E D I T   P R O F I L E    M O D A L

//anonymus function that calls the open modal function when the click happens
editProfileButton.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal)
);

//  closes the edit profile section
closeProfileSection.addEventListener("click", () =>
  closeModal(editProfileModal)
);

// opens edit profile modal and injects user data in the fields
function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

// A D D   C A R D   M O D A L

// opens the add card modal
addCardBtn.addEventListener("click", () => openModal(addCardModal));

// closes the add card modal
closeAddCardModal.addEventListener("click", () => closeModal(addCardModal));

function fillProfileForm() {
  // matches the initial name in the name field w the one in the profile
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}
// H A N D L E   F O R M S

function handleProfileFormSubmit(e) {
  // event = evt = e
  e.preventDefault();
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description"
  );
  profileName.textContent = nameInput.value;
  // console.log(`in profile: ${profileName.value}; input: ${nameInput.value}`);
  profileDescription.textContent = descriptionInput.value;
  console.log(`in profile: ${profileDescription.textContent}`);
  closeModal(editProfileModal);
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(e) {
  e.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  closeModal(addCardModal);
}
addCardForm.addEventListener("submit", handleCardFormSubmit);

// M A N A G I N G   C A R D S

// creates the card element
function getCardElement(
  name = "titulo no disponible",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.cloneNode(true); // clones the template
  const cardTitle = cardElement.querySelector(".card__title"); // selects the title
  cardTitle.textContent = name; // gives a name to card title
  const cardImage = cardElement.querySelector(".card__image"); // selects the image
  cardImage.src = link; // gives a link to the card source

  // O P E N I N G   B I G   I M A G E S
  cardImage.addEventListener("click", () => {
    openModal(imgPopupModal);
    managePopupModal(cardTitle, cardImage);
  });

  // M A N A G I N G    L I K E S
  const cardLikeBtn = cardElement.querySelector(".card__like-button"); // selects like button
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_is-active"); // toggles appearance
  });

  // D E L E T I N G    S O N G S
  const removeCardBtn = cardElement.querySelector(".card__delete-button");
  removeCardBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement; // returns the card with updated name and link
}

// creates the card via getCardelement and then adds it to the DOM
function renderCard(name, link, cardsList) {
  const cardElement = getCardElement(name, link);
  cardsList.append(cardElement);
}

// creates initial cards
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// I M G   P O P U P    M O D A L

// closes modal
closeImgPopupBtn.addEventListener("click", () => closeModal(imgPopupModal));
// gets the image and img title to the popup
function managePopupModal(cardTitle, cardImage) {
  popupImg.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
}

// M A N A G E   M O D A L S

// opens modal
function openModal(modal) {
  modal.classList.add("popup_is-opened"); // no retrun statement as no value needs to be returned
}
// closes modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
