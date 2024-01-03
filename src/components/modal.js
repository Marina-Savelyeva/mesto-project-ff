//Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal и closeModal,
//принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

//открытие окна
export function openModal(event) {
  event.classList.add('popup_is-opened');
  event.classList.add('popup_is-animated');//плавное открытие и закрытие
  document.addEventListener('keydown', closeModalEsc);
}

//закрытие окна
export function closeModal(event) {
  event.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

//Закрытие попапа нажатием на Esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));//ищем обьект нужного класса и убираем его
  }
}

export function clickPopupByClose(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closeModal(event.currentTarget);//ищем обьект нужного класса и убираем его
  }
}
