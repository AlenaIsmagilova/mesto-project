const profileButton = document.querySelector(".profile__button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const popupBtnClosedEdit = document.querySelector("#popupBtnEdit");
const inputNameEditForm = document.querySelector("#inputFirstname");
const inputProfEditForm = document.querySelector("#inputProf");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__subtitle");
const editForm = document.querySelector("#editForm");
const submitButton = document.querySelector(".form__button");
const addForm = document.querySelector("#addForm");
const popupBtnClosedAdd = document.querySelector("#popupBtnAdd");
const profileButtonAdd = document.querySelector(".profile__button-added");
const inputPlaceAddForm = document.querySelector("#inputPlace");
const inputLinkAddForm = document.querySelector("#inputLink");
const popupBtnClosedImage = document.querySelector("#popupBtnImage");
const popupImage = document.querySelector("#popupImage");
const popupElement = document.querySelector(".popup__container");
const popupElImage = document.querySelector(".popup__image");
const popupElCaption = document.querySelector(".popup__caption");
const card = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards__list");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function createCard(link, name) {
  const cardsElement = card.querySelector(".cards__item").cloneNode(true);
  const cardsButton = cardsElement.querySelector(".cards__button");
  const cardsImage = cardsElement.querySelector(".cards__image");
  cardsElement.querySelector(".cards__title").textContent = name;
  cardsImage.setAttribute("src", link);
  //like
  cardsButton.addEventListener("click", function () {
    cardsButton.classList.toggle("cards__button_active");
  });
  //удаление карточек
  const buttonDelete = cardsElement.querySelector("#btnDelete");
  buttonDelete.addEventListener("click", function () {
    cardsElement.remove();
  });
  cardsImage.addEventListener("click", function () {
    openPopup(popupImage);
    popupElImage.setAttribute("src", link);
    popupElImage.setAttribute("alt", name);
    popupElCaption.textContent = name;
  });
  return cardsElement;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameEditForm.value;
  profileProf.textContent = inputProfEditForm.value;
  closePopup(popupEdit);
}
editForm.addEventListener("submit", editFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  //закрытие попапа
  closePopup(popupAdd);
  //добавление карточек
  const card = createCard(inputLinkAddForm.value, inputPlaceAddForm.value);
  cardsList.prepend(card);
  addForm.reset();
}

addForm.addEventListener("submit", addFormSubmitHandler);

profileButton.addEventListener("click", function () {
  openPopup(popupEdit);
  inputNameEditForm.value = profileName.textContent;
  inputProfEditForm.value = profileProf.textContent;
});

popupBtnClosedEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

profileButtonAdd.addEventListener("click", function () {
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
