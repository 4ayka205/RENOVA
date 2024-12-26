import { initAlert } from "./alert.js";

const alert = document.querySelector('#alert');
const pickMeBtn = document.querySelector('.pick-me-btn');

pickMeBtn.addEventListener('click', (evt) => {
    initAlert('choose', 1);
})
