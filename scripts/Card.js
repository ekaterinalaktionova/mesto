import {largeImage, popupImage, popupImageName, closePopupByEsc} from './index.js';

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        ;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    
      return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.card__image').src = `${this._link}`;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;
    this._setEventListeners();
    return this._element;
    }

    _handleLikeCard() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDelete() {
        const currentListItem = this._element.closest('.card');
  currentListItem.remove();
    }
     
_handleOpenPopup() {
 largeImage.src = this._link;
 popupImageName.textContent = this.name;
 popupImage.classList.add('popup_opened');
 document.addEventListener('keydown', closePopupByEsc);
}

 _handleClosePopup(){
  largeImage.src = '';
  popupImageName.textContent = '';
  popupImage.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
 }
   
  _setEventListeners() {
    
    const likeButton = this._element.querySelector('.card__like')
    const deleteButton = this._element.querySelector('.card__delete')
const image = this._element.querySelector('.card__image');

    likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    })

    deleteButton.addEventListener('click', () => {
        this._handleDelete();
    }) 
       image.addEventListener('click', () => {
        this._handleOpenPopup();

image.addEventListener('click', () => {
  this._handleClosePopup();
})

 }) 

  }
}
