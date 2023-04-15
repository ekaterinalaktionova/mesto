const profileEditButton = document.querySelector('.profile__edit'); // profile edit
const profileChangeAvatarButton = document.querySelector('.profile__avatar-btn'); // profile edit

const profileForm = document.querySelector('.popup__form_edit-profile');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_who');
const addButton = document.querySelector('.profile__add');

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
  confirmDeleteCardPopupSelector: '.popup_delete-card',
  profileEditAvatarPopupSelector: '.popup_avatar',
};

export {profileEditButton, profileChangeAvatarButton, profileForm, profileNameInput,
  profileJobInput, addButton, config};