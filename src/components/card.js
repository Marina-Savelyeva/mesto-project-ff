//Функции для работы с карточками проекта Mesto вынесите в файл card.js,
//из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому).
//Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

// @todo: Функция создания карточки
export function createCard(link, name, removeCard, like, openCardImage) {
  const cardTemplate = document.getElementById("card-template").content; //тк id #card-template, обращаемся к содержимому
  const card = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое тега, шаблон

  // вводим переменные
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");

  // наполняем содержимым
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // обработчик клика по иконке
  cardDeleteButton.addEventListener("click", removeCard); //удаление, нажатие на корзину
  cardLikeButton.addEventListener("click", like);//like
  cardImage.addEventListener("click", openCardImage);// попап картинки
  return card;// возвращаем карточку с новыми значениями
}

// @todo: Функция удаления карточки
export function removeCard (event) {
  event.target.closest(".card").remove(); //target - элемент, на котором сработало событие, ищем и удаляем
}

// Функция лайка
export function like(event) {
  event.target.classList.toggle('card__like-button_is-active');//Метод toggle работает как add, если класс отсутствует, remove — если присутствует.
}


