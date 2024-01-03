import '../pages/index.css'; // добавьте импорт главного файла стилей
import {removeCard, createCard, like} from "../components/card.js"
import {openModal, closeModal, clickPopupByClose} from '../components/modal.js';//импорт попапов, модальных окон
import {enableValidation, clearValidation} from '../components/validation.js'; //валидация
import {initialUser, initialCardsAPI, changeProfile, addCardAPI, newAvatar} from '../components/api.js';//api
import {changeButtonLoadingText} from '../components/loading.js';// замена надписи на кнопке

// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");//ищем все попапы
popups.forEach(modal => modal.addEventListener('click', clickPopupByClose))

//Вывести карточки на страницу и аватарку
Promise.all([initialCardsAPI(), initialUser()])
  .then(([initialCards, userData])=>{//данные из функций выше, соответственно
    const userId = userData._id;
    initialCards.forEach(function(item) {
      const initial = createCard(item, userId, openCardImage, removeCard, like); //создаем
      placesList.append(initial); //добавляем в разметку
    })
    const profileTitle = document.querySelector('.profile__title');//ищем наш заголовок, имя
    profileTitle.textContent = userData.name;
    const profileDescription = document.querySelector('.profile__description');//ищем наше описание
    profileDescription.textContent = userData.about;
    const profileImg = document.querySelector('.profile__image');//ищем аватарку
    profileImg.src = userData.avatar;
  })
  .catch((err) => {
    console.log(err);
  })

//-----
//окно редактирование профиля + переменные
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const editProfileForm =document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonUser = editProfileForm.querySelector(".button");

//окно редактирование профиля
buttonEditProfile.addEventListener('click', function() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);//чистка формы, чтобы валидность с прошлого раза не осталась
});

// Обработчик «отправки» формы
function editProfileFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  changeButtonLoadingText(true, buttonUser);//меняем надпись на кнопке
  changeProfile(nameInput.value, jobInput.value)
  .then((res)=>{
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(popupTypeEdit);
  })
  .catch((err) =>{
    console.log(err);
  })
  .finally(()=>{
    changeButtonLoadingText(false, buttonUser);//меняем надпись на кнопке
  })
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener('submit', editProfileFormSubmit);

//-------
//Форма добавления карточки, удаления + переменные
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popupTypeNewCard= document.querySelector(".popup_type_new-card");
const newPlace = document.forms["new-place"];
const popupInputPlaceName = newPlace.querySelector(".popup__input_type_card-name");
const popupInputPlaceUrl = newPlace.querySelector(".popup__input_type_url");
const buttonCard = newPlace.querySelector(".button");

//форма добавления карточки
buttonProfileAdd.addEventListener('click', function() {
  clearValidation(popupTypeNewCard, validationConfig);//чистка формы, чтобы валидность с прошлого раза не осталась
  openModal(popupTypeNewCard);
  newPlace.reset();//Сброс полей ввода — происходит событие reset
})

//отправка данных для карточки
function addCardFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  changeButtonLoadingText(true, buttonCard); //меняем надпись на кнопке
  addCardAPI(popupInputPlaceName.value, popupInputPlaceUrl.value)
  .then((item)=>{
    const userId = item.owner._id;
    placesList.prepend(createCard(item, userId, openCardImage, removeCard, like));//prepend - в начало
    closeModal(popupTypeNewCard);
    })
  .catch((err) =>{
    console.log(err);
  })
  .finally(()=>{
    changeButtonLoadingText(false, buttonCard); //меняем надпись на кнопке
  })
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
newPlace.addEventListener('submit', addCardFormSubmit);

//-------
//Открытие попапа с картинкой +переменные
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

//открытие попапа картинки
function openCardImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openModal(popupTypeImage);
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);//валидация

//-------
//Обновление аватара пользователя +переменные
const avatarChangeButton = document.querySelector(".profile__image_section");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const avatarInput  = document.querySelector(".popup__input_type_avatar");
const avatarForm = document.forms["edit-avatar"];
const buttonAvatar = avatarForm.querySelector(".button");
const profileImage = avatarChangeButton.querySelector(".profile__image");

//форма смены аватарки
avatarChangeButton.addEventListener('click', function(){
  clearValidation(avatarForm, validationConfig);
  openModal(popupTypeAvatar);
  avatarForm.reset();//Сброс полей ввода — происходит событие reset
})
//отправка данных для аватарки
function changeAvatar(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  changeButtonLoadingText(true, buttonAvatar); //меняем надпись на кнопке
  newAvatar(avatarInput.value)
  .then((item)=>{
    profileImage.src = item.avatarInput;
    closeModal(popupTypeAvatar);
    })
  .catch((err) =>{
    console.log(err);
  })
  .finally(()=>{
    changeButtonLoadingText(false, buttonAvatar); //меняем надпись на кнопке
  })
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
avatarForm.addEventListener('submit', changeAvatar);



