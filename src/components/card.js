import {
  card,
  popupElImage,
  popupElCaption,
  popupImage,
  popupDeleteCard,
  deleteCardButton,
} from "./constants.js";
import { closePopup, openPopup } from "./modal.js";
import { like, unlike, deleteCard } from "./api.js";

export function createCard(
  link,
  name,
  numberOfLikes,
  currentUserId,
  ownerId,
  cardId,
  cardLikes = []
) {
  const cardsElement = card.querySelector(".cards__item").cloneNode(true);
  const cardsButton = cardsElement.querySelector(".cards__button");
  const cardsImage = cardsElement.querySelector(".cards__image");
  const likesCount = cardsElement.querySelector(".cards__likes");
  const iconDeleteButton = cardsElement.querySelector(".cards__button-delete");
  iconDeleteButton.addEventListener("click", function () {
    openPopup(popupDeleteCard);
    deleteCardButton.addEventListener("click", function () {
      deleteCard(cardId)
        .then(() => {
          cardsElement.remove();
          closePopup(popupDeleteCard);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  if (currentUserId !== ownerId) {
    iconDeleteButton.classList.add("cards__button-delete_type_inactive");
  }
  likesCount.textContent = numberOfLikes;
  cardsElement.querySelector(".cards__title").textContent = name;
  cardsImage.setAttribute("src", link);
  cardsImage.setAttribute("alt", name);
  //like
  cardsButton.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("cards__button_active")) {
      unlike(cardId)
        .then((data) => {
          cardsButton.classList.remove("cards__button_active");
          likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      like(cardId)
        .then((data) => {
          cardsButton.classList.add("cards__button_active");
          likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const isCurrentUserLikedCard = cardLikes.some(function (userWhoLike) {
    return userWhoLike._id === currentUserId;
  });
  if (isCurrentUserLikedCard) {
    cardsButton.classList.add("cards__button_active");
  }
  cardsImage.addEventListener("click", function (evt) {
    evt.stopPropagation();
    openPopup(popupImage);
    popupElImage.setAttribute("src", link);
    popupElImage.setAttribute("alt", name);
    popupElCaption.textContent = name;
  });
  return cardsElement;
}
