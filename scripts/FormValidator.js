export default class FormValidator {
  constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._errorClass = config.errorClass;
      this._inputErrorClass = config.inputErrorClass;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
      this._spanList = Array.from(this._formElement.querySelectorAll(config.spanError));
    }

  _showInputError(formInput, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(formInput) {
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _deleteError() {
    this._spanList.forEach((spanElement) => {
      spanElement.classList.remove(this._errorClass);
      spanElement.textContent = '';
      this._inputList.forEach((formInput) => {
        formInput.classList.remove(this._inputErrorClass);
      })
    })
  }

  _checkInputValidity(formInput) {

    if (!formInput.validity.valid) {
      this._showInputError(formInput, 'Некорректное значение');
    } else {
      this._hideInputError(formInput);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  _toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  resetValidationState() {
    this._formElement.reset();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }
}