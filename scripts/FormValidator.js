export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._invalidButtonClass = config.invalidButtonClass;
        this._inactiveButtonClass = config.inactiveButtonClass ;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
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

      _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.disabled = false;
        }
      }
    
      _setEventListeners() {  
        this._toggleButtonState();
        
        this._inputList.forEach((formInput) => {
          formInput.addEventListener('input', function() {
            this._checkInputValidity(formInput);
            this._toggleButtonState();
          });
        });
      };
    
      enableValidation() {
        this._setEventListeners();
      }
    }
