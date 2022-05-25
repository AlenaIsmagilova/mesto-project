import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
    }
  
    open({ imgSrc, imgPlaceTitle }) {
      this.popup.querySelector(".popup__image").src = imgSrc;
      this.popup.querySelector(".popup__image").alt = imgSrc;
      this.popup.querySelector(".popup__caption").textContent = imgPlaceTitle;
      super.open();
    }
  }