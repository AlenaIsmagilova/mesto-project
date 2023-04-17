import "./pages/index.css";
import {
  options,
  profileButton,
  editAvatarButton,
  profileButtonAdd,
} from "./utils/Constants.js";
import { FormValidator } from "./components/FormValidator";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Card } from "./components/Card.js";
import { Api } from "./components/Api.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section";

//--------------------------- API
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "9657f4a3-a3d3-4b6a-aa7c-51c28c9ee53b",
    "Content-Type": "application/json",
  },
});
let cardsList;

//----------------------------- user info

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__subtitle",
  avatar: ".profile__avatar",
});

const imagePopup = new PopupWithImage("#popupImage");
imagePopup.setEventListeners();

function getCardElement(card, user) {
  const cardElement = new Card(
    card,
    () => imagePopup.open({ imgSrc: card.link, imgPlaceTitle: card.name }),
    "#card",
    user._id,
    api
  );
  return cardElement.generate();
}

const editFormPopup = new PopupWithForm(
  "#popupEdit",
  //здесь передаю функцию handleEditFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editFormPopup.getInputValues();
    editFormPopup.renderLoading(true);
    api
      .updateUserProfile({
        name: inputValues.firstname,
        about: inputValues.profession,
      })
      .then((data) => {
        userInfo.setUserInfo(data);
        editFormPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => editFormPopup.renderLoading(false));
  }
);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm(
  "#popupAdd",
  //здесь передаю функцию handleAddFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = addFormPopup.getInputValues();
    addFormPopup.renderLoading(true);
    api
      .addNewCard({
        name: inputValues.place,
        link: inputValues.link,
      })
      .then((data) => {
        const createdCard = getCardElement(data, data.owner);
        cardsList.addItem(createdCard);
        addFormPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => addFormPopup.renderLoading(false));
  }
);
addFormPopup.setEventListeners();

const editAvatarForm = new PopupWithForm(
  "#popupEditAvatar",
  //здесь передаю функцию handleEditAvatarFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editAvatarForm.getInputValues();
    editAvatarForm.renderLoading(true);
    api
      .updateUserAvatar({ avatar: inputValues.link })
      .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => editAvatarForm.renderLoading(false));
  }
);

editAvatarForm.setEventListeners();

profileButton.addEventListener("click", (evt) => {
  evt.stopPropagation();
  validatorEditProfile.resetErrors();
  editFormPopup.open();
  const { name, about } = userInfo.getUserInfo();
  editFormPopup.setInputValues({ firstname: name, profession: about });
});

editAvatarButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  validatorEditAvatar.resetErrors();
  editAvatarForm.open();
});

profileButtonAdd.addEventListener("click", function (evt) {
  evt.stopPropagation();
  validatorAddCard.resetErrors();
  addFormPopup.open();
});
api
  .getUser()
  .then((user) => {
    userInfo.setUserInfo(user);
    api.getCards().then((cards) => {
      cardsList = new Section(
        {
          items: cards.reverse(),
          renderer: (item) => {
            const createdCard = getCardElement(item, user);
            cardsList.addItem(createdCard);
          },
        },
        ".cards__list"
      );
      //создаю секцию
      cardsList.renderItems();
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Валидация форм
const validatorEditProfile = new FormValidator(
  options,
  editFormPopup.popup.querySelector("form")
);

const validatorAddCard = new FormValidator(
  options,
  addFormPopup.popup.querySelector("form")
);

const validatorEditAvatar = new FormValidator(
  options,
  editAvatarForm.popup.querySelector("form")
);

// Активировать валидацию
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();
