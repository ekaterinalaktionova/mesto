export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._template = document.querySelector(templateSelector).content.querySelector('.card')
  }

  _handleLikeCard() {
    this._cardLikeButton.classList.toggle('card__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() {
    this._element = this._template.cloneNode(true);

    // store elements for re-usage in other places instead of querying
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._cardDeleteButton = this._element.querySelector('.card__delete');
    this._cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__description').textContent = this._name;

    this._cardImage.src = `${this._link}`;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}
