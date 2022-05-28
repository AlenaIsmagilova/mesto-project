import "./pages/index.css";
import {
  options,
  profileButton,
  editAvatarButton,
  profileButtonAdd,
  editProfileAvatar,
  deleteCardButton,
  cardToDelete,
} from "./components/Constants.js";
import { Validate } from "./components/FormValidate";
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

const editFormPopup = new PopupWithForm(
  "#popupEdit",
  //здесь передаю функцию handleEditFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editFormPopup.getInputValues();
    evt.submitter.textContent = "Сохранение...";
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
      .finally(() => (evt.submitter.textContent = "Сохранить"));
  }
);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm(
  "#popupAdd",
  //здесь передаю функцию handleAddFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = addFormPopup.getInputValues();
    evt.submitter.textContent = "Сохранение...";
    api
      .addNewCard({
        name: inputValues.place,
        link: inputValues.link,
      })
      .then((data) => {
        const createdCard = new Card(
          data,
          () => {
            imagePopup.open({ imgSrc: data.link, imgPlaceTitle: data.name });
          },
          "#card",
          data.owner._id,
          api
        );
        const cardElement = createdCard.generate();
        cardsList.addItem(cardElement);
        addFormPopup.close();
        evt.submitter.setAttribute("disabled", true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (evt.submitter.textContent = "Сохранить"));
  }
);
addFormPopup.setEventListeners();

const editAvatarForm = new PopupWithForm(
  "#popupEditAvatar",
  //здесь передаю функцию handleEditAvatarFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editAvatarForm.getInputValues();
    evt.submitter.textContent = "Сохранение...";
    api
      .updateUserAvatar({ avatar: inputValues.link })
      .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarForm.close();
        inputValues.link = "";
        evt.submitter.setAttribute("disabled", true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (evt.submitter.textContent = "Сохранить"));
  }
);

editAvatarForm.setEventListeners();

profileButton.addEventListener("click", (evt) => {
  evt.stopPropagation();
  editFormPopup.open();
  const { name, about } = userInfo.getUserInfo();
  editFormPopup.setInputValues({ firstname: name, profession: about });
});

editAvatarButton.addEventListener("click", function (evt) {
  evt.stopPropagation();
  editAvatarForm.open();
});

profileButtonAdd.addEventListener("click", function (evt) {
  evt.stopPropagation();
  addFormPopup.open();
});
api
  .getUser()
  .then((user) => {
    userInfo.setUserInfo(user);
    editProfileAvatar.setAttribute("src", user.avatar);
    api.getCards().then((cards) => {
      function getCardElement(card) {
        const cardElement = new Card(
          card,
          () =>
            imagePopup.open({ imgSrc: card.link, imgPlaceTitle: card.name }),
          "#card",
          user._id,
          api
        );
        return cardElement.generate();
      }
      cardsList = new Section(
        {
          items: cards.reverse(),
          renderer: (item) => {
            const createdCard = getCardElement(item);
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

deleteCardButton.addEventListener("click", function () {
  api
    .deleteCard(cardToDelete.cardId)
    .then((data) => {
      const card = new Card(
        data,
        () => {
          imagePopup.open({ imgSrc: data.link, imgPlaceTitle: data.name });
        },
        "#card",
        data.owner._id,
        api
      );
      card.setEventListeners();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Валидация форм
const validatorEditProfile = new Validate(
  options,
  editFormPopup.popup.querySelector("form")
);

const validatorAddCard = new Validate(
  options,
  addFormPopup.popup.querySelector("form")
);

const validatorEditAvatar = new Validate(
  options,
  editAvatarForm.popup.querySelector("form")
);

// Активировать валидацию
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();
