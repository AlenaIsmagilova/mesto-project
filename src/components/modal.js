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
import { Api } from "./Api.js";
import { data } from "autoprefixer";
import { Popup } from "./Popup.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    "Content-Type": "application/json",
  },
});







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
