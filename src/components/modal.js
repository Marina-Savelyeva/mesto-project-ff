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

//закрытие по нажатию на крестик
function clickCloseButton(event) {
  if (event.target.classList.contains('popup__close')) {
    closeModal(event.target.closest('.popup_is-opened'));//ищем обьект нужного класса и убираем его
  }
}

const modals = document.querySelectorAll(".popup");//ищем все попапы

function clickClose() {
  modals.forEach(function(popup){
    popup.addEventListener("click", function(event){
      if (popup.target === popup.currentTarget){//закртыие оверлеем
        closeModal(event.target);
      }
      clickCloseButton(event);//закрытие по нажатию на крестик
    });
  });
}

clickClose();
