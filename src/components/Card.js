import {API} from "./Api.js";

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._currentUserId = data.userId;

    this._template = document.querySelector(templateSelector).content.querySelector('.card')
  }

  _handleLikeCard() {

    const hasLike = this._isLikedByUser(this._currentUserId);

    if (!hasLike) {
      API.likeCard(this._id).then(res => {
        this._cardLikeButton.classList.toggle('card__like_active', true);
        this._likes = res.likes;
        this._cardLikesCount.textContent = '' + this._likes.length;
      }).catch(err => console.error('Failed to update the card like status, err=', err));
    } else {
      API.unlikeCard(this._id).then(res => {
        this._cardLikeButton.classList.toggle('card__like_active', false);
        this._likes = res.likes;
        this._cardLikesCount.textContent = '' + this._likes.length;
      }).catch(err => console.error('Failed to update the card like status, err=', err));
    }
  }

  _isLikedByUser(userId) {
    return (this._likes && !!this._likes.find(like => like._id === userId));
  }

  _isOwner(userId) {
    return this._owner._id === userId;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeCard();
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
    API.deleteCard(this._id).then((res) => {
      this._element.remove();
    }).catch(err => console.error('Failed to delete card, err=', err));
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
