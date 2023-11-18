// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(link, name, removeCard) {
  const cardTemplate = document.getElementById("card-template").content; //тк id #card-template, обращаемся к содержимому
  const card = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое тега, шаблон

  // вводим переменные
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");

  // наполняем содержимым
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // обработчик клика по иконке
  cardDeleteButton.addEventListener("click", removeCard); //удаление, нажатие на корзину

  return card;// возвращаем карточку с новыми значениями
}
// @todo: Функция удаления карточки
function removeCard (event) {
  const evt = event.target.closest(".card").remove(); //target - элемент, на котором сработало событие, ищем и удаляем
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const initial = createCard(card.link, card.name, removeCard);//создаем карточку
  placesList.append(initial);//добавляем данные (выведите все карточки из массива на страницу в элемент)
});
