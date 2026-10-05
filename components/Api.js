class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getUserInfo() {
    const URL = `${this._baseURL}/users/me`;
    return this.requestData(URL);
  }

  updateProfilePic(newPicLink) {
    const URL = `${this._baseURL}/users/me/avatar`;
    return this.patchData(URL, newPicLink);
  }

  getInitialCards() {
    const URL = `${this._baseURL}/cards/`;
    return this.requestData(URL);
  }

  patchUserInfo(newValues) {
    const URL = `${this._baseURL}/users/me`;
    return this.patchData(URL, newValues);
  }

  addNewCard(input) {
    const URL = `${this._baseURL}/cards/`;
    return this.postData(URL, input);
  }

  addLike(cardId) {
    const URL = `${this._baseURL}/cards/${cardId}/likes`;
    return this._putData(URL);
  }

  removeLike(cardId) {
    const URL = `${this._baseURL}/cards/${cardId}/likes`;
    return this._deleteData(URL);
  }

  removeCard(cardId) {
    const URL = `${this._baseURL}/cards/${cardId}`;
    return this._deleteData(URL);
  }

  getInitialCardsAndUserData() {
    const userAndCardsRequest = Promise.all([
      this.getInitialCards(),
      this.getUserInfo(),
    ]);
    return userAndCardsRequest;
  }

  requestData(URL) {
    //here we return for index.js so it waits and then decides what to do with info returned
    return fetch(URL, { headers: this._headers }).then((res) => {
      return this._checkResponse(res);
    });
  }

  patchData(URL, valuesObj) {
    return fetch(URL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(valuesObj),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  postData(URL, input) {
    return fetch(URL, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(input),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _putData(URL) {
    return fetch(URL, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _deleteData(URL) {
    return fetch(URL, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _checkResponse(res) {
    if (!res.ok) {
      throw new Error(`something went wrong: ${res.status}`);
    }
    return res.json();
  }
}

export default Api;
