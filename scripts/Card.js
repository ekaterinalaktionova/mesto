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
        this._setEventListeners();

        this._element.querySelector('.card__image').src = `${this._link}`;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;
    
    return this._element;
    }

    _handleLikeCard() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDelete() {
        const currentListItem = this._element.closest('.card');
  currentListItem.remove();
    }

  _setEventListeners() {
    
    const likeButton = this._element.querySelector('.card__like')
    const deleteButton = this._element.querySelector('.card__delete')

    likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    })

    deleteButton.addEventListener('click', () => {
        this._handleDelete();
    }) 
        
    }
}
