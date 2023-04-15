import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  profileEditButton, profileChangeAvatarButton, profileForm, profileNameInput,
  profileJobInput, addButton, config
} from '../utils/constants.js';
import './index.css';

import {api} from "../components/Api.js";

let cardSelectedToDelete = null;

const init = async () => {

  // ### USER PROFILE ###

  const userInfo = new UserInfo({
    userNameElement: '.profile__name',
    userInfoElement: '.profile__who',
    userAvatarElement: '.profile__avatar',
  });

  const [userData, initialCards] = await Promise.all([
    api.getMe(),
    api.getCards()
      .catch(err => console.error(`Failed to fetch cards, status=${err.status}`))
  ]);

  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);

  const profilePopup = new PopupWithForm({
    formSubmitHandler: (item) => {
      return api.updateProfile({
        name: item.name,
        about: item.job,
      }).then(res => {
        userInfo.setUserInfo(res.name, res.about);
      }).catch(err => {
        console.error('Failed to update profile, err=', err);
        userInfo.setUserInfo('Произошла ошибка', 'Обновите страницу');
      });
    },
    popupCloseHandler: () => {
      formEditProfileValidator.hideAllErrors();
      formEditProfileValidator.toggleButtonState();
    },
  }, config.popupEditProfileSelector);
  profilePopup.setEventListeners();


  profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();

    formEditProfileValidator.resetValidation();
    profileNameInput.value = userData.name;
    profileJobInput.value = userData.job;
    profilePopup.open();
  });

  const editProfileAvatarPopup = new PopupWithForm({
    formSubmitHandler: (item) => {
      // "saving..."
      return api.updateProfileAvatar(item.avatarUrl).then(res => {
        // "saved!""
        userInfo.setUserInfo(res.name, res.about, res.avatar);
      }).catch(err => console.error('Failed to update avatar, err=', err));
    },
    popupCloseHandler: () => {
      formEditAvatarValidator.hideAllErrors();
      formEditAvatarValidator.toggleButtonState();
    },
  }, config.profileEditAvatarPopupSelector);
  editProfileAvatarPopup.setEventListeners();

  profileChangeAvatarButton.addEventListener('click', () => {
    // show popup
    formEditAvatarValidator.resetValidation();
    editProfileAvatarPopup.open();
  })


  // ### CARDS ###


  const allCards = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      allCards.addItem(createCard({userId: userData._id, ...item}))
    }
  }, config.cardsContainerSelector);

  allCards.renderItems();

  const addCardPopup = new PopupWithForm({
    formSubmitHandler: (item) => {
      return api.addCard(item.name, item.link).then(addedCard => {
        allCards.addItem(createCard({userId: userData._id, ...addedCard}));
        formAddNewCardValidator.toggleButtonState();
      }).catch(err => console.error('Failed to add card, err=', err));
    },
    popupCloseHandler: () => {
      formAddNewCardValidator.hideAllErrors();
      formAddNewCardValidator.toggleButtonState();
    },
  }, config.addNewCardSelector);
  addCardPopup.setEventListeners();

  addButton.addEventListener("click", () => {
    addCardPopup.open();
  });
}

init().catch(err => console.error('Init error: ', err));

const confirmDeleteCardPopup = new PopupWithForm({
  formSubmitHandler: () => {
    if (!!cardSelectedToDelete) {
      return api.deleteCard(cardSelectedToDelete._id)
        .then(() => {
          cardSelectedToDelete.delete();
        })
        .catch(err => console.error('Failed to delete card, err=', err));
    }
  },
  popupCloseHandler: () => {
    // idk
  },
}, config.confirmDeleteCardPopupSelector);
confirmDeleteCardPopup.setEventListeners();

function createCard(card) {
  const item = new Card(card, '.template-card', {
    handleCardClick: () => {
      popupWithImage.open(card.name, card.link)
    },
    handleCardDeleteClick: () => {
      cardSelectedToDelete = cardToDelete;
      confirmDeleteCardPopup.open();
    },
    handleLikeClick: () => {
      // like click
      const hasLike = item._isLikedByUser(item._currentUserId);

      if (!hasLike) {
        api.likeCard(item._id).then(res => {
          item._handleLikeCard();
          item._likes = res.likes
          item._cardLikesCount.textContent = '' + item._likes.length;
        }).catch(err => console.error('Failed to update the card like status, err=', err));
      } else {
        api.unlikeCard(item._id).then(res => {
          item._cardLikeButton.classList.toggle('card__like_active', false);
          item._likes = res.likes;
          item._cardLikesCount.textContent = '' + item._likes.length;
        }).catch(err => console.error('Failed to update the card like status, err=', err));
      }
    }
  });
  return item.generateCard();
}


const formAddNewCardValidator = new FormValidator(config, addForm);
formAddNewCardValidator.enableValidation();
const formEditProfileValidator = new FormValidator(config, profileForm);
formEditProfileValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, avatarForm);
formEditAvatarValidator.enableValidation();

const popupWithImage = new PopupWithImage(config.popupWithImageSelector);
popupWithImage.setEventListeners();
