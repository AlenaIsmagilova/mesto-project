import { Popup } from "./popup";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => (inputsValues[input.name] = input.value));

    return inputsValues;
  }

  _setEventListeners() {
    super.setEventListeners();
    this.inputsValues = this._getInputValues();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInitialProfileInfo(user) {
    this._inputs.forEach((input) => {
      if (input.id === "inputFirstname") {
        input.value = user.name;
      }
      if (input.id === "inputProf") {
        input.value = user.about;
      }
    });
  }
}
