export const updateUserProfile = (profileData) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-9/users/me", {
    method: "PATCH",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
};

export const addNewCard = (cardAttribute) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-9/cards", {
    method: "POST",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardAttribute),
  });
};

export const updateUserAvatar = (avatar) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-9/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avatar),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const like = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const unlike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getUser = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-9/users/me", {
    method: "GET",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-9/cards", {
    method: "GET",
    headers: {
      authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
