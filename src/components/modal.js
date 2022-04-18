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
} from "./constants.js";
import { createCard } from "./card.js";

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", handleEscapeClick);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", handleEscapeClick);
}

export function handleEscapeClick(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function handleAddFormSubmit(evt) {
  evt.preventDefault();
  //закрытие попапа
  closePopup(popupAdd);
  //добавление карточек
  const card = createCard(inputLinkAddForm.value, inputPlaceAddForm.value);
  cardsList.prepend(card);
  addForm.reset();
  evt.submitter.setAttribute("disabled", true);
}

export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formInput.value;
  profileProf.textContent = inputProfEditForm.value;
  closePopup(popupEdit);
}

export function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  imageProfileAvatar.setAttribute("src", inputLinkEditAvatar.value);
  closePopup(popupEditAvatar);
  inputLinkEditAvatar.value = "";
  evt.submitter.setAttribute("disabled", true);
}
