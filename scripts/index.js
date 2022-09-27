let formElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');

 editButton.addEventListener('click', function(e) {
  e.preventDefault()
  formElement.classList.add('popup_opened')
 });

 closeButton.addEventListener('click', function() {
  formElement.classList.remove('popup_opened');
 });

 let nameInput = document.querySelector('.popup__input_name');
 let jobInput = document.querySelector('.popup__input_who');

 function formSubmitHandler (evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(jobInput.value);

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__who');
   
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }

  formElement.addEventListener('submit', formSubmitHandler);