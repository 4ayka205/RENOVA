import { initAlert } from "./alert.js";

const alert = document.querySelector('#alert');
const pickMeBtns = document.querySelectorAll('.pick-me-btn');


const postTrainingNumber = async (evt) => {

    const buttonValue = evt.target.value; // Значение кнопки

    const formData = new FormData();
    formData.append('button_value', buttonValue); // Значение кнопки
    try {
        const response = await fetch('/save-workout/', {
            method: 'POST',
            body: formData // Отправляем FormData
        });

        if (response.redirected) {
            // Если сервер отвечает редиректом, перенаправляем пользователя
            window.location.href = response.url;
        } else if (response.ok) {
            initAlert('choosen');
        } else {
            console.error('Ошибка отправки:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
    }
};

pickMeBtns.forEach((pickMeBtn) =>{
    pickMeBtn.addEventListener('click',  (evt) => {
        evt.preventDefault();
        initAlert('choose', () => postTrainingNumber(evt));
    })
});