import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {profileEditButton, profileChangeAvatarButton, profileForm, profileNameInput,
  profileJobInput, addButton, config} from '../utils/constants.js';
import './index.css';

import {API} from "../components/Api.js";

let cardSelectedToDelete = null;

//test

const init = async () => {

  // ### USER PROFILE ###

  const userInfo = new UserInfo({
    userNameElement: '.profile__name',
    userInfoElement: '.profile__who',
    userAvatarElement: '.profile__avatar',
  });

  const userData = await API.getMe();
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);

  const profilePopup = new PopupWithForm({
    formSubmitHandler: (item) => {
      userInfo.setUserInfo('Обновление...', '');

      API.updateProfile({
        name: item.name,
        about: item.job,
      }).then(res => {
        userInfo.setUserInfo(res.name, res.about);
      }).catch(err => {
        console.error('Failed to update profile, err=', err);
        userInfo.setUserInfo('Произошла ошибка', 'Обновите страницу');
        formEditProfileValidator.toggleButtonState()
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
      API.updateProfileAvatar(item.avatarUrl).then(res => {
        // "saded!""
        userInfo.setUserInfo(res.name, res.about, res.avatar);
      }).catch(err => console.error('Failed to update avatar, err=', err));
      console.log()
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

  const initialCards = await API.getCards()
    .catch(err => console.error(`Failed to fetch cards, status=${err.status}`));

  const allCards = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      allCards.addItem(createCard({userId: userData._id, ...item}))
    }
  }, config.cardsContainerSelector);

  allCards.renderItems();

  const addCardPopup = new PopupWithForm({
    formSubmitHandler: (item) => {
      API.addCard(item.name, item.link).then(addedCard => {
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

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const confirmDeleteCardPopup = new PopupWithForm({
  formSubmitHandler: () => {
    if(!!cardSelectedToDelete){
      cardSelectedToDelete.delete();
    }
  },
  popupCloseHandler: () => {
  // idk
  },
}, config.confirmDeleteCardPopupSelector);
confirmDeleteCardPopup.setEventListeners();

function createCard(card) {
  const item = new Card(card, '.template-card', () => {
    popupWithImage.open(card.name, card.link)
  }, (cardToDelete) => {
    cardSelectedToDelete = cardToDelete;
    confirmDeleteCardPopup.open();
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
