import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector('.popup__large-image');
    this._description = this._popup.querySelector('.popup__card-name');
  }

  //override
  open(name, link) {
    super.open();

    this._description.textContent = name;
    this._image.alt = name;
    this._image.src = link;
  }

}
