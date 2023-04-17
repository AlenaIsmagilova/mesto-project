import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this.popup.querySelector(".popup__image");
    this._popupCaption = this.popup.querySelector(".popup__caption");
  }

  open({ imgSrc, imgPlaceTitle }) {
    this._popupImage.src = imgSrc;
    this._popupImage.alt = imgSrc;
    this._popupCaption.textContent = imgPlaceTitle;
    super.open();
  }
}
