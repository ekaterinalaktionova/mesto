export default class Card {
  constructor(data, templateSelector, {handleCardClick, handleCardDeleteClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._currentUserId = data.userId;

    this._template = document.querySelector(templateSelector).content.querySelector('.card')
  }

  _handleLikeCard() {
    this._cardLikeButton.classList.toggle('card__like_active');
  }

  _isLikedByUser(userId) {
    return (this._likes && !!this._likes.find(like => like._id === userId));
  }

  _isOwner(userId) {
    return this._owner._id === userId;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    if (!!this._cardDeleteButton) {
      this._cardDeleteButton.addEventListener('click', () => {
        this._handleCardDeleteClick(this);
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  delete() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._template.cloneNode(true);

    // store elements for re-usage in other places instead of querying
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._cardLikesCount = this._element.querySelector('.card__likes-count');

    this._cardImage = this._element.querySelector('.card__image');

    // show delete button only for my own cards
    this._cardDeleteButton = this._element.querySelector('.card__delete');
    if (!this._isOwner(this._currentUserId)) {
      this._cardDeleteButton.remove();
    }

    this._element.querySelector('.card__description').textContent = this._name;

    this._cardImage.src = `${this._link}`;
    this._cardImage.alt = this._name;

    // apply status
    this._cardLikeButton.classList.toggle('card__like_active', this._isLikedByUser(this._currentUserId));
    this._cardLikesCount.textContent = '' + this._likes.length;

    this._setEventListeners();
    return this._element;
  }
}
