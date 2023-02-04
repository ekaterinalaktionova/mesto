export { largeImage, popupImage, popupImageName, closePopupByEsc};
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.cards');
const popupEdit = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit');
const profileForm = document.querySelector('.popup__form_edit-profile');
const addForm = document.querySelector('.popup__form_add-card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_who');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__who');
const popupAdd = document.querySelector('.popup_add-card');
const addButton = document.querySelector('.profile__add');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');
const popupImage = document.querySelector('.popup_image');
const largeImage = document.querySelector('.popup__large-image');
const popupImageName = document.querySelector('.popup__card-name');
const cardTemplate = document.querySelector ('.template-card').content;
const saveEditButton = popupEdit.querySelector('.popup__save');
const saveAddButton = popupAdd.querySelector('.popup__save');


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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}


// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
  }

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = { name: cardNameInput.value, link: cardLinkInput.value };
  cardsContainer.prepend(createCard(card));
  closePopup(popupAdd);
}

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (
      evt.target.classList.contains('popup__close') ||
      evt.target.classList.contains('popup_opened')
    ) {
      closePopup(popup);
    }
  });
})

/*function toggleLikeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

  function deleteCard(evt) {
    evt.target.closest('.card').remove();
  }
*/

 /*function openImagePopup (link, name) {
    const popupImage = document.querySelector('.popup__large-image');
    const largeImage = document.querySelector('.popup__large-image');
    largeImage.src = link;
    document.querySelector('.popup__card-name').textContent = name;
    largeImage.alt = name;
    openPopup(popupImage);
  }*/
  
function createCard(card) {
  /*const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardDescription.textContent = card.name;
  cardElement.querySelector('.card__like').addEventListener('click', toggleLikeCard);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => openImagePopup(card.link, card.name));*/

  const item = new Card(card, '.template-card');

  const cardElement = item.generateCard();

  return cardElement;
}

/*function renderCard(card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}
function renderInitialCards() {
  initialCards.forEach(function (card) {
    renderCard(card);
  });
}*/


function renderInitialCards() {
  const cardsList = initialCards.map(createCard);
  cardsContainer.prepend(...cardsList);
}

renderInitialCards();

/*function deleteError(form) {
  const inputs = form.querySelectorAll('.popup__input');
  inputs.forEach((input) => {
    hideInputError(form, input, config);
  });
}*/

editButton.addEventListener('click', () => {
  /*const formValidatoradd = new FormValidator (config, popupEdit);
  formValidatoradd.enableValidation()
  deleteError(popupEdit);*/
  const formEditProfileValidator = new FormValidator(config, profileForm);
    formEditProfileValidator.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  saveEditButton.disabled = false;
  /*deleteError(profileForm);*/
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  /*const formValidatoradd = new FormValidator (config, popupAdd);*/
  const formAddNewCardValidator = new FormValidator (config, addForm);
    formAddNewCardValidator.enableValidation();
  saveAddButton.disabled = true;
  addForm.reset();
  /*deleteError(addForm);*/
  openPopup(popupAdd);
});


    

profileForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleCardFormSubmit);