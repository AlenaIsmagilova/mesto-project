import "./pages/index.css";
import { formElement, options } from "./components/constants.js";
import { enableValidation } from "./components/validate.js";
import { editForm } from "./components/constants.js";
import { editFormSubmitHandler } from "./components/modal.js";
import { addForm } from "./components/constants.js";
import { addFormSubmitHandler } from "./components/modal.js";
import { editAvatarForm } from "./components/constants.js";
import { editAvatarFormSubmitHandler } from "./components/modal.js";
import { profileButton } from "./components/constants.js";
import { openPopup, closePopup } from "./components/modal.js";
import { popupEdit } from "./components/constants.js";
import { formInput } from "./components/constants.js";
import { profileName } from "./components/constants.js";
import { profileProf } from "./components/constants.js";
import { handleOutsiteClick } from "./components/modal.js";
import { handleEscapeClick } from "./components/modal.js";
import { inputProfEditForm } from "./components/constants.js";
import { editAvatarButton } from "./components/constants.js";
import { popupEditAvatar } from "./components/constants.js";
import { popupBtnEditAvatar } from "./components/constants.js";
import { popupBtnClosedEdit } from "./components/constants.js";
import { profileButtonAdd } from "./components/constants.js";
import { popupAdd } from "./components/constants.js";
import { popupBtnClosedAdd } from "./components/constants.js";
import { popupBtnClosedImage } from "./components/constants.js";
import { popupImage } from "./components/constants.js";
import { cardsList } from "./components/constants.js";
import { initialCards } from "./components/constants.js";
import { createCard } from "./components/card.js";

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

enableValidation(options);

editForm.addEventListener("submit", editFormSubmitHandler);

addForm.addEventListener("submit", addFormSubmitHandler);

editAvatarForm.addEventListener("submit", editAvatarFormSubmitHandler);

profileButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupEdit);
  formInput.value = profileName.textContent;
  inputProfEditForm.value = profileProf.textContent;
  window.addEventListener("click", handleOutsiteClick);
  window.addEventListener("keydown", handleEscapeClick);
});

editAvatarButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupEditAvatar);
  window.addEventListener("click", handleOutsiteClick);
  window.addEventListener("keydown", handleEscapeClick);
});

popupBtnEditAvatar.addEventListener("click", function () {
  closePopup(popupEditAvatar);
});

popupBtnClosedEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

profileButtonAdd.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupAdd);
  window.addEventListener("click", handleOutsiteClick);
  window.addEventListener("keydown", handleEscapeClick);
});

popupBtnClosedAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});

popupBtnClosedImage.addEventListener("click", function () {
  closePopup(popupImage);
});

initialCards.forEach(function (item) {
  const card = createCard(item.link, item.name);
  cardsList.append(card);
});
