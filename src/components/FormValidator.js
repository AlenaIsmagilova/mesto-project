export class FormValidator {
  constructor(options, formElement) {
    this._formInput = options.formInput;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inputError = options.inputError;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._isFormValid = null;
    this._inputElementsArray = Array.from(
      this._formElement.querySelectorAll(this._formInput)
    );
  }

  _setSubmitButtonAbility() {
    if (this._isFormValid) {
      this._submitButton.removeAttribute("disabled", true);
    } else {
      this._submitButton.setAttribute("disabled", true);
    }
  }

  resetErrors() {
    this._inputElementsArray.forEach((input) => {
      this._hideError(input);
    });
    this._checkValidityForSubmit();
  }

  _setEventListeners() {
    this._inputElementsArray.forEach((inputElement) =>
      inputElement.addEventListener("input", () =>
        this._checkValidity(inputElement)
      )
    );
    this._formElement.addEventListener("input", () =>
      this._checkValidityForSubmit()
    );
  }

  _showError(inputElement) {
    inputElement.classList.add(this._inputError);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent =
      inputElement.validationMessage;
  }

  _hideError(inputElement) {
    inputElement.classList.remove(this._inputError);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent =
      "";
  }

  _checkValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _checkValidityForSubmit() {
    this._isFormValid = !this._inputElementsArray.some(
      (inputElement) => !inputElement.validity.valid
    );
    this._setSubmitButtonAbility();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
