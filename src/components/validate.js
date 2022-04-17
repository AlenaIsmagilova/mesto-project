// import { options } from "./constants";

const showInputError = (formElement, inputElement, errorMessage, myOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // inputElement.classList.add("form__input_type_error");
  inputElement.classList.add(myOptions.errorClass.substring(1));
  errorElement.textContent = errorMessage;
  // errorElement.classList.add("form__input-error_active");
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
};
