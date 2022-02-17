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
const cardsSection = document.querySelector(".cards");
const inputPlaceAddForm = document.querySelector("#inputPlace");
const inputLinkAddForm = document.querySelector("#inputLink");
const popupBtnClosedImage = document.querySelector("#popupBtnImage");
const popupImage = document.querySelector("#popupImage");
const popupElement = document.querySelector(".popup__container");
const popupElImage = document.querySelector(".popup__image");
const popupElCaption = document.querySelector(".popup__caption");

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

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameEditForm.value;
  profileProf.textContent = inputProfEditForm.value;
  popupEdit.classList.remove("popup_opened");
}
editForm.addEventListener("submit", editFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  //закрытие попапа
  popupAdd.classList.remove("popup_opened");
  //добавление карточек
  const card = document.querySelector("#card").content;
  const cardsElement = card.querySelector(".cards__item").cloneNode(true);
  const cardsButton = cardsElement.querySelector(".cards__button");
  const cardsImage = cardsElement.querySelector(".cards__image");
  cardsElement.querySelector(".cards__title").textContent =
    inputPlaceAddForm.value;
  cardsImage.setAttribute("src", inputLinkAddForm.value);
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
    popupImage.classList.add("popup_opened");
    popupElImage.setAttribute("src", inputLinkAddForm.value);
    popupElImage.setAttribute("alt", inputPlaceAddForm.value);
    popupElCaption.textContent = inputPlaceAddForm.value;
  });
  cardsSection.querySelector(".cards__list").prepend(cardsElement);
}
addForm.addEventListener("submit", addFormSubmitHandler);

initialCards.forEach(function (item) {
  const card = document.querySelector("#card").content;
  const cardsElement = card.querySelector(".cards__item").cloneNode(true);
  const cardsButton = cardsElement.querySelector(".cards__button");
  const cardsImage = cardsElement.querySelector(".cards__image");
  cardsElement.querySelector(".cards__title").textContent = item.name;
  cardsImage.setAttribute("src", item.link);
  cardsImage.setAttribute("alt", item.name);
  cardsSection.querySelector(".cards__list").append(cardsElement);
  cardsButton.addEventListener("click", function () {
    cardsButton.classList.toggle("cards__button_active");
  });
  const buttonDelete = cardsElement.querySelector("#btnDelete");
  buttonDelete.addEventListener("click", function () {
    cardsElement.remove();
  });
  cardsImage.addEventListener("click", function () {
    popupImage.classList.add("popup_opened");
    popupElImage.setAttribute("src", item.link);
    popupElImage.setAttribute("alt", item.name);
    popupElCaption.textContent = item.name;
  });
});

profileButton.addEventListener("click", function () {
  popupEdit.classList.add("popup_opened");
  inputNameEditForm.value = profileName.textContent;
  inputProfEditForm.value = profileProf.textContent;
});

popupBtnClosedEdit.addEventListener("click", function () {
  popupEdit.classList.remove("popup_opened");
});

profileButtonAdd.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});

popupBtnClosedAdd.addEventListener("click", function () {
  popupAdd.classList.remove("popup_opened");
});

popupBtnClosedImage.addEventListener("click", function () {
  popupImage.classList.remove("popup_opened");
});
