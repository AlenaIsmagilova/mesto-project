// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
//   headers: {
//     authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
//     "Content-Type": "application/json",
//   },
// };

export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._cardsUrl = `${this._url}/cards`;
    this._userUrl = `${this._url}/users/me`
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

// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// }

// export const updateUserProfile = (profileData) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(profileData),
//   }).then(checkResponse);
// };

// export const addNewCard = (cardAttribute) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify(cardAttribute),
//   }).then(checkResponse);
// };

// export const updateUserAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(avatar),
//   }).then(checkResponse);
// };

// export const like = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//   }).then(checkResponse);
// };

// export const unlike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then(checkResponse);
// };

// export const deleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then(checkResponse);
// };

// export const getUser = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "GET",
//     headers: config.headers,
//   }).then(checkResponse);
// };

// export const getCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: "GET",
//     headers: config.headers,
//   }).then(checkResponse);
// };
