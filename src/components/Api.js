export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._cardsUrl = `${this._url}/cards`;
    this._userUrl = `${this._url}/users/me`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getUser = () => {
    return fetch(this._userUrl, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  getCards = () => {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  deleteCard = (cardId) => {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  addNewCard = (cardAttribute) => {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardAttribute),
    }).then(this._checkResponse);
  };

  unlike = (cardId) => {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  updateUserProfile = (profileData) => {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(profileData),
    }).then(this._checkResponse);
  };

  updateUserAvatar = (avatar) => {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  };

  like = (cardId) => {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  };
}
