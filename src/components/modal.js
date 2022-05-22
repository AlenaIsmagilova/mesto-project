import {
  profileName,
  profileProf,
  popupEdit,
  formInput,
  inputProfEditForm,
  popupEditAvatar,
  imageProfileAvatar,
  inputLinkEditAvatar,
  addForm,
  cardsList,
  inputLinkAddForm,
  inputPlaceAddForm,
  popupAdd,
  deleteCardButton,
} from "./constants.js";
import { createCard } from "./card.js";
import { Api } from "./api.js";
import { data } from "autoprefixer";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    "Content-Type": "application/json",
  },
});

export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
  }

  //открытие попапа
  open() {
    this.popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this.popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  //метод для закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  }

  //cлушатель событий
  setEventListeners() {
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__button-closed")) {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({ imgSrc, imgPlaceTitle }) {
    this.popup.querySelector(".popup__image").src = imgSrc;
    this.popup.querySelector(".popup__image").alt = imgSrc;
    this.popup.querySelector(".popup__caption").textContent = imgPlaceTitle;
    super.open();
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
  }

  //метод для сбора инфы с инпутов
  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => (inputsValues[input.name] = input.value));

    return inputsValues;
  }

  _setEventListeners() {
    super.setEventListeners();
    this.inputsValues = this._getInputValues();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInitialProfileInfo(user) {
    this._inputs.forEach((input) => {
      if (input.id === "inputFirstname") {
        input.value = user.name;
      }
      if (input.id === "inputProf") {
        input.value = user.about;
      }
    });
  }
}

// // export function closePopup(popup) {
// //   popup.classList.remove("popup_opened");
// //   window.removeEventListener("keydown", handleEscapeClick);
// // }

// // export function openPopup(popup) {
// //   popup.classList.add("popup_opened");
// //   window.addEventListener("keydown", handleEscapeClick);
// }

// // export function handleEscapeClick(evt) {
// //   if (evt.key === "Escape") {
// //     const openedPopup = document.querySelector(".popup_opened");
// //     closePopup(openedPopup);
// //   }
// }

// export function handleAddFormSubmit(evt) {
//   evt.preventDefault();
//   evt.submitter.textContent = "Сохранение...";
//   api
//     .addNewCard({
//       name: inputPlaceAddForm.value,
//       link: inputLinkAddForm.value,
//     })
//     .then((data) => {
//       console.log(data);
//       const card = createCard(
//         data.link,
//         data.name,
//         data.likes.length,
//         data.owner._id,
//         data.owner._id,
//         data._id
//       );
//       closePopup(popupAdd);
//       cardsList.prepend(card);
//       addForm.reset();
//       evt.submitter.setAttribute("disabled", true);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => (evt.submitter.textContent = "Сохранить"));
// }

// export function handleEditFormSubmit(evt) {
//   evt.preventDefault();
//   evt.submitter.textContent = "Сохранение...";
//   api
//     .updateUserProfile({
//       name: formInput.value,
//       about: inputProfEditForm.value,
//     })
//     .then((data) => {
//       profileName.textContent = data.name;
//       profileProf.textContent = data.about;
//       closePopup(popupEdit);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => (evt.submitter.textContent = "Сохранить"));
// }

// export function handleEditAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   evt.submitter.textContent = "Сохранение...";
//   api
//     .updateUserAvatar({
//       avatar: inputLinkEditAvatar.value,
//     })
//     .then((data) => {
//       imageProfileAvatar.setAttribute("src", data.avatar);
//       closePopup(popupEditAvatar);
//       inputLinkEditAvatar.value = "";
//       evt.submitter.setAttribute("disabled", true);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => (evt.submitter.textContent = "Сохранить"));
// }
