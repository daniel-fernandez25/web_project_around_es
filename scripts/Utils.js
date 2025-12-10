import { FormValidator, config } from "./FormValidator.js";

// edit profile
const profilePageSection = document.querySelector(".profile.page__section"); //profile section page
const editProfileButton = profilePageSection.querySelector(
  ".profile__edit-button"
); // edit profile button
const editProfileModal = document.querySelector("#edit-popup"); // modal itself
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const nameField = editProfileModal.querySelector(".popup__input_type_name");
const descriptionField = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileName = profilePageSection.querySelector(".profile__title");
const profileDescription = profilePageSection.querySelector(
  ".profile__description"
);
// all page popups
const popups = document.querySelectorAll(".popup");

// edit profile
editProfileButton.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal)
);

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function fillProfileForm() {
  // matches the initial name in the name field w the one in the profile
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}

function handleProfileFormSubmit(e) {
  // event = evt = e
  e.preventDefault();
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description"
  );
  profileName.textContent = nameInput.value;
  console.log(
    `in profile: ${descriptionInput.value}; input: ${nameInput.value}`
  );
  profileDescription.textContent = descriptionInput.value;
  // console.log(`in profile: ${profileDescription.textContent}`);
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// closes any popups using the X button
popups.forEach((popup) =>
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  })
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  // Attach the overlay click listener to the modal itself
  // This ensures clicks outside the popup trigger closing
  modal.addEventListener("click", overlayCloseModal);
  window.addEventListener("keydown", escKeyCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  // Remove the overlay click listener when closing
  // This prevents multiple listeners from stacking each time it's opened
  modal.removeEventListener("click", overlayCloseModal);
  window.removeEventListener("keydown", escKeyCloseModal);

  // resets validation if modal is a form
  const form = modal.querySelector(".popup__form");
  if (form) {
    // console.log(form.id);
    const formObj = new FormValidator(config, `#${form.id}`);
    formObj._resetForm(formObj._formElement);
  }
}

// Handles closing the modal when clicking on the overlay (background)
function overlayCloseModal(evt) {
  // evt.currentTarget → the element with the listener (the modal)
  // evt.target → the exact element clicked (could be inside the popup)
  const modal = evt.currentTarget;

  // Close only if the user clicks directly on the overlay, not inside the popup
  if (evt.target === modal) {
    closeModal(modal);
  }
}

function escKeyCloseModal(evt) {
  if (evt.key === "Escape") {
    // selects the opened modal and closes it
    const modal = document.querySelector(".popup_is-opened");
    // console.log("Modal found:", modal);
    closeModal(modal);
  }
}

export { openModal, closeModal };
