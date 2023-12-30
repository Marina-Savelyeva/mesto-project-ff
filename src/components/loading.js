export function loading(event, button){
  (!event)? button.textContent = "Сохранить": button.textContent = "Сохранение...";
}
