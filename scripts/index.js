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

//anonymus function that calls the open modal function when the click happens
editProfileButton.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal)
);

closeProfileSection.addEventListener("click", () =>
  closeModal(editProfileModal)
);

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

// opens modal
function openModal(modal) {
  modal.classList.add("popup_is-opened"); // no retrun statement as no value needs to be returned
  fillProfileForm();
}
// closes modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  // matches the initial name in the name field w the one in the profile
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
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
