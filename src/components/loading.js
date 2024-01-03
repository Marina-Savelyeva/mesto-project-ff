export function changeButtonLoadingText(loadingStatus, button){
  button.textContent = loadingStatus ? "Сохранение..." : "Сохранить";
}
