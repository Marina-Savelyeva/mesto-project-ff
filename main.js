(()=>{"use strict";var e=document.getElementById("card-template").content;function t(t,n,r,o,c){var p=e.querySelector(".card").cloneNode(!0),a=p.querySelector(".card__image"),d=p.querySelector(".card__delete-button"),u=p.querySelector(".card__title"),s=p.querySelector(".card__like-button");return u.textContent=n,a.src=t,a.alt=n,d.addEventListener("click",r),s.addEventListener("click",o),a.addEventListener("click",c),p}function n(e){e.target.closest(".card").remove()}function r(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){e.target===e.currentTarget&&c(t.target),function(e){e.target.classList.contains("popup__close")&&c(e.target.closest(".popup_is-opened"))}(t)}))}));var a=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=t(e.link,e.name,n,r,E);a.append(o)}));var d=document.querySelector(".profile__edit-button"),u=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup__input_type_name"),i=document.querySelector(".popup__input_type_description"),l=document.forms["edit-profile"],_=document.querySelector(".profile__title"),m=document.querySelector(".profile__description");d.addEventListener("click",(function(){o(u),s.value=_.textContent,i.value=m.textContent})),l.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=s.value,m.textContent=i.value,c(u)}));var y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),f=document.forms["new-place"],k=f.querySelector(".popup__input_type_card-name"),g=f.querySelector(".popup__input_type_url");y.addEventListener("click",(function(){o(v)})),f.addEventListener("submit",(function(e){e.preventDefault(),a.prepend(t(g.value,k.value,n,r,E)),c(v),f.reset()}));var q=document.querySelector(".popup_type_image"),S=document.querySelector(".popup__image"),L=document.querySelector(".popup__caption");function E(e){S.src=e.target.src,S.alt=e.target.alt,L.textContent=e.target.alt,o(q)}})();