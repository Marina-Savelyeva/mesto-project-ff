const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',//когорта
  headers: {
    authorization: '10b8028b-2a3b-4f48-a971-8c381370f2f5',//токен
    'Content-Type': 'application/json'
  }
};
//Код обработки результат
const  processRequest= res => {
  return (res.ok)? res.json() : Promise.reject(`Что-то не так: ${res.status}`);
}

//загрузка инфы о пользователе с сервера (инициализация)
export const initialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) =>
    processRequest(res))
};

//карточки с сервера
export const initialCardsAPI = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers:config.headers
  })
  .then((res) =>
    processRequest(res))
};

//Редактирование профиля
export const changeProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput
    })
  })
  .then((res) =>
    processRequest(res))
};

//Добавление новой карточки
export const addCardAPI = (placeName, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: link
    })
  })
  .then((res) =>
    processRequest(res))
};

//ставим лайк
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method:'PUT',
    headers: config.headers
  })
  .then((res) =>
    processRequest(res))
};

//убираем лайк
export const disLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method:'DELETE',
    headers: config.headers
  })
  .then((res) =>
    processRequest(res))
};

//Удаление карточки
export const deleteCard = cardId => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method:'DELETE',
    headers: config.headers
  })
  .then((res) =>
    processRequest(res))
};

//Обновление аватара пользователя
export const newAvatar = url => {
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then((res) =>
    processRequest(res))
};
