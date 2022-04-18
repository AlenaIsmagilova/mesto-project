import "./pages/index.css";
import {
  options,
  editForm,
  addForm,
  editAvatarForm,
  profileButton,
  popupEdit,
  formInput,
  profileName,
  profileProf,
  inputProfEditForm,
  editAvatarButton,
  popupEditAvatar,
  popupBtnEditAvatar,
  popupBtnClosedEdit,
  profileButtonAdd,
  popupAdd,
  popupBtnClosedAdd,
  popupBtnClosedImage,
  popupImage,
  cardsList,
  initialCards,
  popups,
} from "./components/constants.js";
import { enableValidation } from "./components/validate.js";
import {
  handleEditFormSubmit,
  handleAddFormSubmit,
  handleEditAvatarFormSubmit,
  openPopup,
  closePopup,
} from "./components/modal.js";
import { createCard } from "./components/card.js";

popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button-closed")) {
      closePopup(popup);
    }
  });
});

enableValidation(options);

editForm.addEventListener("submit", handleEditFormSubmit);

addForm.addEventListener("submit", handleAddFormSubmit);

editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

profileButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupEdit);
  formInput.value = profileName.textContent;
  inputProfEditForm.value = profileProf.textContent;
});

editAvatarButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupEditAvatar);
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
