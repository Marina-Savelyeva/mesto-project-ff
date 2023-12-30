// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*validationEnable({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});*/
/*Сделайте функцию enableValidation ответственной за включение валидации всех форм.
Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек.*/

export function enableValidation(validationEnable){
  const formlist = Array.from(document.querySelectorAll(validationEnable.formSelector));//добавили на каждую форму по селектору
  formlist.forEach((formElement)=>{
    formElement.addEventListener('submit', (event) => {event.preventDefault();});
    setEventListeners(formElement, validationEnable);
});
};

function isValid(formElement, inputElement, validationEnable){
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);// встроенный метод setCustomValidity принимает на вход строку и заменяет ею стандартное сообщение об ошибке
  } else {
    inputElement.setCustomValidity(""); // если передать пустую строку, то будут доступны стандартные браузерные сообщения
  }
  if (!inputElement.validity.valid) { // теперь, если ошибка вызвана регулярным выражением, переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage, validationEnable);
  } else {
    hideInputError(formElement, inputElement, validationEnable);
  }
};

function showInputError(formElement, inputElement, errorMessage, validationEnable){//добавление классы ошибок
  const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(errorInput);
  inputElement.classList.add(validationEnable.inputErrorClass); //inputElement.classList.add('popup__input_type_error');
  errorInput.textContent = errorMessage;
  errorInput.classList.add(validationEnable.errorClass); //errorInput.classList.add('popup__error_visible');
};

function hideInputError(formElement, inputElement, validationEnable){//удалили классы ошибок, противоположно функции выше
  const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationEnable.inputErrorClass);
  errorInput.textContent = "";
  errorInput.classList.remove(validationEnable.errorClass);
};

function toogleButton(inputList, buttonElement, validationEnable){//кнопка
  // сделай кнопку неактивной
  if (invalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationEnable.inactiveButtonClass);//popup__button_disabled
  }else{
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationEnable.inactiveButtonClass);//popup__button_disabled
  }
};

function invalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};


function setEventListeners(formElement, validationEnable){
    const inputList = Array.from(formElement.querySelectorAll(validationEnable.inputSelector)); //находим ввод данных
    const buttonElement = formElement.querySelector(validationEnable.submitButtonSelector);//находим кнопку отправки
    toogleButton(inputList, buttonElement, validationEnable);
    inputList.forEach((inputElement)=>{
      inputElement.addEventListener('input', ()=>{
        isValid(formElement, inputElement, validationEnable);
        toogleButton(inputList, buttonElement, validationEnable);//кнопка
      })
    }
    )
};

export function clearValidation(formElement, validationEnable){//чистка
  const inputList = Array.from(formElement.querySelectorAll(validationEnable.inputSelector)); //находим ввод данных
  const buttonElement = formElement.querySelector(validationEnable.submitButtonSelector);//находим кнопку отправки
  buttonElement.classList.add(validationEnable.inactiveButtonClass);//popup__button_disabled
  inputList.forEach((inputElement)=>{
    hideInputError(formElement, inputElement, validationEnable);
    inputElement.setCustomValidity('');
  });
};

