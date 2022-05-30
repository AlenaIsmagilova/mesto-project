export class Validate {
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
    // this._formList = Array.from(document.querySelectorAll(options.formElement));
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
    // this._formList.forEach((formElement) => {
    //   formElement.addEventListener("submit", (evt) => {
    //     evt.preventDefault();
    //   });
    // });
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

/* const showInputError = (formElement, inputElement, errorMessage, myOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(myOptions.errorClass.substring(1));
  errorElement.textContent = errorMessage;
  errorElement.classList.add(myOptions.inputErrorClass.substring(1));
};

const hideInputError = (formElement, inputElement, myOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(myOptions.errorClass.substring(1));
  errorElement.classList.remove(myOptions.inputErrorClass.substring(1));
  errorElement.textContent = "";
};

const isValidForm = (formElement, inputElement, myOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      myOptions
    );
  } else {
    hideInputError(formElement, inputElement, myOptions);
  }
};

const setEventListeners = (formElement, myOptions) => {
  const inputList = Array.from(
    formElement.querySelectorAll(myOptions.formInput)
  );
  const submitButton = formElement.querySelector(
    myOptions.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValidForm(formElement, inputElement, myOptions);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.removeAttribute("disabled");
  }
};

export const enableValidation = (myOptions) => {
  const formList = Array.from(document.querySelectorAll(myOptions.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, myOptions);
  });
};  */
