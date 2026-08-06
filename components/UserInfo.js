class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    // Store the profile elements that will be read and updated.
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    // Return the current profile values from the page.
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    // Update the profile values on the page.
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;
