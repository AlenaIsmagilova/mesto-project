import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
    this._popupSubmit = this._form.querySelector('.form__button');
  }

  getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => (inputsValues[input.name] = input.value));

    return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.inputsValues = this.getInputValues();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, buttonText = 'Сохранить') {
    if(isLoading) {
      this._popupSubmit.textContent = "Сохранение...";
    } else {
      this._popupSubmit.textContent = buttonText;
    }
  }
}
