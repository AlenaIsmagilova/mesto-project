export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this._linkedHandleEscClosed = this._handleEscClose.bind(this);
  }

  //открытие попапа
  open() {
    this.popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._linkedHandleEscClosed);
  }

  //закрытие попапа
  close() {
    this.popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._linkedHandleEscClosed);
  }

  //метод для закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //cлушатель событий
  setEventListeners() {
    this.popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__button-closed")) {
        this.close();
      }
    });
  }
}
