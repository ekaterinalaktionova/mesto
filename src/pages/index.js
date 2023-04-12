import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import './index.css'; // добавьте импорт главного файла стилей 

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  popupWithImageSelector: '.popup_image',
  popupEditProfileSelector: '.popup_edit-profile',
  cardsContainerSelector: '.cards',
  addNewCardSelector: '.popup_add-card',
};

const profileEditButton = document.querySelector('.profile__edit'); // profile edit
const profileForm = document.querySelector('.popup__form_edit-profile');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_who');
const addButton = document.querySelector('.profile__add');


//Массив карточек с фотографиями
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function createCard(card) {
  const item = new Card(card, '.template-card', () => {
    popupWithImage.open(card.name, card.link)
  });
  return item.generateCard();
}

const allCards = new Section({
  items: initialCards,
  renderer: (item) => {
    allCards.addItem(createCard(item))
  }
}, config.cardsContainerSelector);

allCards.renderItems();

const formAddNewCardValidator = new FormValidator(config, addForm);
formAddNewCardValidator.enableValidation();

const addCardPopup = new PopupWithForm({
  formSubmitHandler: (item) => {
    const newCardInput = {
      name: item.name,
      link: item.link,
    };

    allCards.addItem(createCard(newCardInput));
    formAddNewCardValidator.toggleButtonState();
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

const formEditProfileValidator = new FormValidator(config, profileForm);
formEditProfileValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  formEditProfileValidator.resetValidation();
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  profilePopup.open();
});

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  userInfoElement: '.profile__who',
});

const profilePopup = new PopupWithForm({
  formSubmitHandler: (item) => {
    userInfo.setUserInfo(item.name, item.job);
    formEditProfileValidator.toggleButtonState()
  },
  popupCloseHandler: () => {
    formEditProfileValidator.hideAllErrors();
    formEditProfileValidator.toggleButtonState();
  },
}, config.popupEditProfileSelector);
profilePopup.setEventListeners();

const popupWithImage = new PopupWithImage(config.popupWithImageSelector);
popupWithImage.setEventListeners();
