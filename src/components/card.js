//Функции для работы с карточками проекта Mesto вынесите в файл card.js,
//из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому).
//Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

import {deleteCard, addLike, disLike} from '../components/api';

const cardTemplate = document.getElementById("card-template").content; //тк id #card-template, обращаемся к содержимому

// @todo: Функция создания карточки
export function createCard(item, userId, openCardImage, removeCard, like) {
  const card = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое тега, шаблон

  // вводим переменные
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeNumber = card.querySelector(".card-like-count"); //для кол-ва лайков

  // наполняем содержимым
  card.dataset.cardId = item._id;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  //удаление, нажатие на корзину
  if (userId === item.owner._id){ //проверка являемся ли мы создателем этой карточки
    cardDeleteButton.addEventListener("click", (event) => removeCard(card)); //можем удалить
  }else{
    cardDeleteButton.remove(); //удаляем саму кнопку корзины
  }

  //like
  cardLikeButton.addEventListener("click", (event)=> {like(event, item._id)});
  cardLikeNumber.textContent = item.likes.length; //заполняем содержимым

  item.likes.forEach(item=> { //проверка лайка на нажатие раннее
    if (userId === item._id){
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })

  cardImage.addEventListener("click", openCardImage);// попап картинки

  return card; // возвращаем карточку с новыми значениями
}

// @todo: Функция удаления карточки
export function removeCard (card) {
  deleteCard(card.dataset.cardId)
  .then(() => {card.remove()})
  .catch((err) => {
    console.log(err);
  })
}

// Функция лайка
export function like(event, cardId) {
  const likeNumber = event.target.parentNode.querySelector('.card-like-count');
  const likeMethod = event.target.classList.contains('card__like-button_is-active') ? disLike : addLike;
  likeMethod(cardId)
    .then ((card)=>{
      likeNumber.textContent = card.likes.length;
      event.target.classList.toggle('card__like-button_is-active'); //target - элемент, на котором сработало событие
    })
    .catch((err) =>{
      console.log(err);
    })
}

