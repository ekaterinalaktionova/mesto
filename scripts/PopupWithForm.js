import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(formHandlers, selector) {
    super(selector);
    this._formSubmitHandler = formHandlers.formSubmitHandler;
    this._formCloseHandler = formHandlers.popupCloseHandler;

    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  // override
  close() {
    super.close();
    this._formCloseHandler();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  resetForm() {
    this._formElement.reset();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}
