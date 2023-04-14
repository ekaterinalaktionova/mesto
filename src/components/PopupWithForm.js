import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(formHandlers, selector) {
    super(selector);
    this._formSubmitHandler = formHandlers.formSubmitHandler;
    this._formCloseHandler = formHandlers.popupCloseHandler;

    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitBtn = this._formElement.querySelector('.popup__save');
    this._submitBtnText = this._submitBtn.textContent;
  }

  // override
  close() {
    super.close();
    this._formElement.reset();
    this._formCloseHandler();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}
