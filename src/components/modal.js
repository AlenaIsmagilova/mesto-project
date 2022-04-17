import { profileName } from "./constants.js";
import { profileProf } from "./constants.js";
import { popupEdit } from "./constants.js";
import { formInput } from "./constants.js";
import { inputProfEditForm } from "./constants.js";
import { popupEditAvatar } from "./constants.js";
import { imageProfileAvatar } from "./constants.js";
import { inputLinkEditAvatar } from "./constants.js";
import { addForm } from "./constants.js";
import { cardsList } from "./constants.js";
import { inputLinkAddForm } from "./constants.js";
import { inputPlaceAddForm } from "./constants.js";
import { popupAdd } from "./constants.js";
import { createCard } from "./card.js";

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function handleOutsiteClick(evt) {
  if (evt.target.classList.contains("popup")) {
    const openedPopup = evt.target;
    closePopup(openedPopup);
    window.removeEventListener("click", handleOutsiteClick);
  }
}

export function handleEscapeClick(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
    window.removeEventListener("click", handleOutsiteClick);
  }
}

export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  //закрытие попапа
  closePopup(popupAdd);
  //добавление карточек
  const card = createCard(inputLinkAddForm.value, inputPlaceAddForm.value);
  cardsList.prepend(card);
  addForm.reset();
}

export function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formInput.value;
  profileProf.textContent = inputProfEditForm.value;
  closePopup(popupEdit);
}

export function editAvatarFormSubmitHandler(evt) {
  evt.preventDefault();
  imageProfileAvatar.setAttribute("src", inputLinkEditAvatar.value);
  closePopup(popupEditAvatar);
  inputLinkEditAvatar.value = "";
}
