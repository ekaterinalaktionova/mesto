const popupEdit = document.querySelector('.popup__edit');
const openPopupButton = document.querySelector('.profile__edit');
const closePopupButton = popup.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.profile__name');
let jobInput = document.querySelector('.profile__info');
let newTextName = document.querySelector('.popup__input');
let newTextJob = document.querySelector('.popup__input');

const popupCard = document.querySelector('.popup_add');
const openPopupCard = document.querySelector('.profile__add');
const closePopupCard = popupCard.querySelector('.popup__close');


const togglePopup = () => {
    popup.classList.toggle('popup_opened');
}


const togglePopupCard = () => {
    popupCard.classList.toggle('popup_opened');
}



function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameInput.textContent = newTextName.value;
    jobInput.textContent = newTextJob.value;
    togglePopup();
}
formElement.addEventListener('submit', formSubmitHandler); 

openPopupButton.addEventListener('click', () => {
    togglePopup();
    newTextName.value = nameInput.textContent;
    newTextJob.value = jobInput.textContent;
})
closePopupButton.addEventListener('click', togglePopup);


openPopupCard.addEventListener('click', togglePopupCard)
closePopupCard.addEventListener('click', togglePopupCard);