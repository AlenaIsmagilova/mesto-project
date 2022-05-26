import "./pages/index.css";
import {
  options,
  profileButton,
  editAvatarButton,
  profileButtonAdd,
  editProfileAvatar,
  deleteCardButton,
} from "./components/constants.js";
import { Validate } from "./components/validate";
import { PopupWithForm } from "./components/popupWithForm.js";
import { PopupWithImage } from "./components/popupWithImage.js";
import { cardToDelete, Card } from "./components/card.js";
import { Api } from "./components/api.js";
import { UserInfo } from "./components/userInfo.js";
import { Section } from "./components/section";

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

//const userInfo = new UserInfo(".profile__name", ".profile__subtitle");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", function (evt) {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__button-closed")) {
//       closePopup(popup);
//     }
//   });
// });

const imagePopup = new PopupWithImage("#popupImage");
imagePopup.setEventListeners();

const editFormPopup = new PopupWithForm(
  "#popupEdit",
  //здесь передаю функцию handleEditFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editFormPopup._getInputValues();
    evt.submitter.textContent = "Сохранение...";
    api
      .updateUserProfile({
        name: inputValues.firstname,
        about: inputValues.profession,
      })
      .then((data) => {
        // profileName.textContent = data.name;
        // profileProf.textContent = data.about;
        userInfo.setUserInfo(data);
        editFormPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (evt.submitter.textContent = "Сохранить"));
  }
);
editFormPopup._setEventListeners();

const addFormPopup = new PopupWithForm(
  "#popupAdd",
  //здесь передаю функцию handleAddFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = addFormPopup._getInputValues();
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
        //здесь нужно добавить класс Section
        cardsList.addItem(cardElement);
        // cardsList.prepend(cardElement);
        addFormPopup.close();
        evt.submitter.setAttribute("disabled", true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (evt.submitter.textContent = "Сохранить"));
  }
);
addFormPopup._setEventListeners();

const editAvatarForm = new PopupWithForm(
  "#popupEditAvatar",
  //здесь передаю функцию handleEditAvatarFormSubmit
  (evt) => {
    evt.preventDefault();
    const inputValues = editAvatarForm._getInputValues();
    evt.submitter.textContent = "Сохранение...";
    api
      .updateUserAvatar({ avatar: inputValues.link })
      .then((data) => {
        const imageProfileAvatar = document.querySelector(".profile__avatar");
        imageProfileAvatar.setAttribute("src", data.avatar);
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

editAvatarForm._setEventListeners();

//enableValidation(options);

// editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

profileButton.addEventListener("click", (evt) => {
  evt.stopPropagation();
  editFormPopup.open();

  // formInput.value = profileName.textContent;
  // inputProfEditForm.value = profileProf.textContent;
  editFormPopup.setInitialProfileInfo(userInfo.getUserInfo());
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
    // profileName.textContent = user.name;
    // profileProf.textContent = user.about;
    userInfo.setUserInfo(user);
    editProfileAvatar.setAttribute("src", user.avatar);
    api.getCards().then((cards) => {
      cards.forEach(function (card) {
        const cardElement = new Card(
          card,
          () =>
            imagePopup.open({ imgSrc: card.link, imgPlaceTitle: card.name }),
          // (imgSrc) => {
          //   openPopup(popupImage);
          //   popupElImage.src = imgSrc;
          // },
          "#card",
          user._id,
          api
        );
        const createdCard = cardElement.generate();
        cardsList = new Section(
          {
            items: cards.reverse(),
            renderer: () => {
              cardsList.addItem(createdCard);
            },
          },
          ".cards__list"
        );
        //создаю секцию
        cardsList.renderItems();
        // const createdCard = createCard(
        //   card.link,
        //   card.name,
        //   card.likes.length,
        //   user._id,
        //   card.owner._id,
        //   card._id,
        //   card.likes
        // );
        // cardsList.append(createdCard);
      });
    });
    // .catch((err) => {
    //   console.log(err);
    // });
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
      card._setEventListeners();
      // closePopup(popupDeleteCard);
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
