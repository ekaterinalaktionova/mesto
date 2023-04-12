export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
