export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  hideAllErrors() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    })
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

  _checkInputValidity(formInput) {

    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }


  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }
}
