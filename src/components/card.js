export let cardToDelete = {};
export class Card {
  constructor(card, handleCardClick, selector, userId, api) {
    this._title = card.name;
    this._src = card.link;
    this._selector = selector;
    this._numberOfLikes = card.likes.length;
    this.card = card;
    this.ownerId = card.owner._id;
    this.currentUserId = userId;
    this.cardLikes = card.likes;
    this.cardId = card._id;
    this._handleCardClick = handleCardClick;
    this._api = api;

    this._toggleLike = this._toggleLike.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  //метод возвращает разметку из HTML и клонирует элемент
  _getElement() {
    const cardsElement = document
      .querySelector(this._selector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardsElement;
  }

  //метод возращает готовую карточку
  generate() {
    this.element = this._getElement();

    this.cardsImage = this.element.querySelector(".cards__image");
    this.likesCount = this.element.querySelector(".cards__likes");
    this.iconDeleteButton = this.element.querySelector(".cards__button-delete");
    this.cardsButton = this.element.querySelector(".cards__button");
    //добавляю данные в поле
    this.cardsImage.src = this._src;
    this.cardsImage.alt = this._title;
    this.likesCount.textContent = this._numberOfLikes;
    this.element.querySelector(".cards__title").textContent = this._title;

    this._setEventListeners();
    this._setInitialLikes();
    this._setDeleteButtonInvisible();

    return this.element;
  }

  //метод для перестановки лайков
  _toggleLike() {
    if (this.cardsButton.classList.contains("cards__button_active")) {
      this._api
        .unlike(this.cardId)
        .then((data) => {
          this.cardsButton.classList.remove("cards__button_active");
          this.likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .like(this.cardId)
        .then((data) => {
          this.cardsButton.classList.add("cards__button_active");
          this.likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //добавляю слушатель событий
  _setEventListeners() {
    this.cardsButton.addEventListener("click", this._toggleLike);
    this.iconDeleteButton.addEventListener("click", this._deleteCard);
    this.cardsImage.addEventListener("click", () =>
      this._handleCardClick(this._src)
    );
  }

  //метод для удаления карточек
  _deleteCard() {
    this._api
      .deleteCard(this.cardId)
      .then(() => {
        this.element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //метод для того, чтобы иконка удаления была только на созданных тобой карточках
  _setDeleteButtonInvisible() {
    if (this.currentUserId !== this.ownerId) {
      this.iconDeleteButton.classList.add("cards__button-delete_type_inactive");
    }
  }

  //отображение лайков при начальной загрузке страницы
  _setInitialLikes() {
    const isCurrentUserLikedCard = this.cardLikes.some((userWhoLike) => {
      return userWhoLike._id === this.currentUserId;
    });
    if (isCurrentUserLikedCard) {
      this.cardsButton.classList.add("cards__button_active");
    }
  }
}

// export function createCard(
//   link,
//   name,
//   numberOfLikes,
//   currentUserId,
//   ownerId,
//   cardId,
//   cardLikes = []
// ) {
//   const cardsElement = card.querySelector(".cards__item").cloneNode(true);
//   const cardsButton = cardsElement.querySelector(".cards__button");
//   const cardsImage = cardsElement.querySelector(".cards__image");
//   const likesCount = cardsElement.querySelector(".cards__likes");
//   const iconDeleteButton = cardsElement.querySelector(".cards__button-delete");
//   iconDeleteButton.addEventListener("click", function () {
//     openPopup(popupDeleteCard);
//     cardToDelete = { cardId, cardsElement };
//   });
//   if (currentUserId !== ownerId) {
//     iconDeleteButton.classList.add("cards__button-delete_type_inactive");
//   }
//   likesCount.textContent = numberOfLikes;
//   cardsElement.querySelector(".cards__title").textContent = name;
//   cardsImage.setAttribute("src", link);
//   cardsImage.setAttribute("alt", name);
//   //like
//   cardsButton.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("cards__button_active")) {
//       api
//         .unlike(cardId)
//         .then((data) => {
//           cardsButton.classList.remove("cards__button_active");
//           likesCount.textContent = data.likes.length;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       api
//         .like(cardId)
//         .then((data) => {
//           cardsButton.classList.add("cards__button_active");
//           likesCount.textContent = data.likes.length;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
//   const isCurrentUserLikedCard = cardLikes.some(function (userWhoLike) {
//     return userWhoLike._id === currentUserId;
//   });
//   if (isCurrentUserLikedCard) {
//     cardsButton.classList.add("cards__button_active");
//   }
//   cardsImage.addEventListener("click", function (evt) {
//     evt.stopPropagation();
//     openPopup(popupImage);
//     popupElImage.setAttribute("src", link);
//     popupElImage.setAttribute("alt", name);
//     popupElCaption.textContent = name;
//   });
//   return cardsElement;
// }
