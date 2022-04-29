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
  profileButtonAdd,
  popupAdd,
  cardsList,
  editProfileAvatar,
  popups,
  deleteCardButton,
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
import { getUser, getCards } from "./components/api.js";

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

profileButtonAdd.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openPopup(popupAdd);
});
getUser()
  .then((user) => {
    profileName.textContent = user.name;
    profileProf.textContent = user.about;
    editProfileAvatar.setAttribute("src", user.avatar);
    getCards()
      .then((cards) => {
        cards.forEach(function (card) {
          const createdCard = createCard(
            card.link,
            card.name,
            card.likes.length,
            user._id,
            card.owner._id,
            card._id,
            card.likes
          );
          cardsList.append(createdCard);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
