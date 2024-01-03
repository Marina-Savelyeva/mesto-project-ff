// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*validationConfig({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});*/
/*Сделайте функцию enableValidation ответственной за включение валидации всех форм.
Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек.*/

export function enableValidation(validationConfig){
  const formlist = Array.from(document.querySelectorAll(validationConfig.formSelector));//добавили на каждую форму по селектору
  formlist.forEach((formElement)=>{
    formElement.addEventListener('submit', (event) => {event.preventDefault();});
    setEventListeners(formElement, validationConfig);
});
};

function isValid(formElement, inputElement, validationConfig){
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);// встроенный метод setCustomValidity принимает на вход строку и заменяет ею стандартное сообщение об ошибке
  } else {
    inputElement.setCustomValidity(""); // если передать пустую строку, то будут доступны стандартные браузерные сообщения
  }
  if (!inputElement.validity.valid) { // теперь, если ошибка вызвана регулярным выражением, переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function showInputError(formElement, inputElement, errorMessage, validationConfig){//добавление классы ошибок
  const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(errorInput);
  inputElement.classList.add(validationConfig.inputErrorClass); //inputElement.classList.add('popup__input_type_error');
  errorInput.textContent = errorMessage;
  errorInput.classList.add(validationConfig.errorClass); //errorInput.classList.add('popup__error_visible');
};

function hideInputError(formElement, inputElement, validationConfig){//удалили классы ошибок, противоположно функции выше
  const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorInput.textContent = "";
  errorInput.classList.remove(validationConfig.errorClass);
};

function toogleButton(inputList, buttonElement, validationConfig){//кнопка
  // сделай кнопку неактивной
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  }else{
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);//popup__button_disabled
  }
};

function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

function  disableSubmitButton(buttonElement, validationConfig){//добавила метод disabled
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);//popup__button_disabled
}

function setEventListeners(formElement, validationConfig){
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //находим ввод данных
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);//находим кнопку отправки
    toogleButton(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement)=>{
      inputElement.addEventListener('input', ()=>{
        isValid(formElement, inputElement, validationConfig);
        toogleButton(inputList, buttonElement, validationConfig);//кнопка
      })
    }
    )
};

export function clearValidation(formElement, validationConfig){//чистка
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //находим ввод данных
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);//находим кнопку отправки
  disableSubmitButton(buttonElement, validationConfig);
  inputList.forEach((inputElement)=>{
    hideInputError(formElement, inputElement, validationConfig);
    inputElement.setCustomValidity('');
  });
};

