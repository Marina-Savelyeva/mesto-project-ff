import '../pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards} from "./cards.js";//импорт фото
import {removeCard, createCard, like} from "../components/card.js"
import {openModal, closeModal} from '../components/modal.js';//импорт попапов, модальных окон


// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const initial = createCard(card.link, card.name, removeCard, like, openCardImage);//создаем карточку
  placesList.append(initial);//добавляем данные (выведите все карточки из массива на страницу в элемент)
});

//-----
//окно редактирование профиля + переменные
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElement =document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//окно редактирование профиля
buttonEditProfile.addEventListener('click', function() {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Обработчик «отправки» формы, хотя пока, она никуда отправляться не будет
function handleFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(event.target.closest('.popup'));
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//-------
//Форма добавления карточки +переменные
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popupTypeNewCard= document.querySelector(".popup_type_new-card");
const newPlace = document.forms["new-place"];
const popupInputPlaceName = newPlace.querySelector(".popup__input_type_card-name");
const popupInputPlaceUrl = newPlace.querySelector(".popup__input_type_url");

//форма добавления карточки
buttonProfileAdd.addEventListener('click', function() {
  openModal(popupTypeNewCard);
})

//отправка данных для карточки
function addCardFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  placesList.prepend(createCard(popupInputPlaceUrl.value, popupInputPlaceName.value, removeCard, like, openCardImage));//prepend - в начало
  closeModal(event.target.closest('.popup'));
  newPlace.reset();//Сброс полей ввода — происходит событие reset
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
}

