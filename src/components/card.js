import { card, popupElImage, popupElCaption, popupImage } from "./constants.js";
import { openPopup } from "./modal.js";

export function createCard(link, name) {
  const cardsElement = card.querySelector(".cards__item").cloneNode(true);
  const cardsButton = cardsElement.querySelector(".cards__button");
  const cardsImage = cardsElement.querySelector(".cards__image");
  cardsElement.querySelector(".cards__title").textContent = name;
  cardsImage.setAttribute("src", link);
  cardsImage.setAttribute("alt", name);
  //like
  cardsButton.addEventListener("click", function () {
    cardsButton.classList.toggle("cards__button_active");
  });
  //удаление карточек
  const buttonDelete = cardsElement.querySelector("#btnDelete");
  buttonDelete.addEventListener("click", function () {
    cardsElement.remove();
  });
  cardsImage.addEventListener("click", function (evt) {
    evt.stopPropagation();
    openPopup(popupImage);
    popupElImage.setAttribute("src", link);
    popupElImage.setAttribute("alt", name);
    popupElCaption.textContent = name;
  });
  return cardsElement;
}
