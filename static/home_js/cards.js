import { initAlert } from "./alert.js";

const alert = document.querySelector('#alert');
const pickMeBtns = document.querySelectorAll('.pick-me-btn');

function getCSRFToken() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

const postTrainingNumber = async (buttonValue) => {

    const formData = new FormData();
    formData.append('button_value', buttonValue); // Значение кнопки
    try {
        const response = await fetch('/save-workout/', {
            method: 'POST',
            body: formData, // Отправляем FormData
            headers: {
            'X-CSRFToken': getCSRFToken()
        }
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

pickMeBtns.forEach((pickMeBtn) => {
    pickMeBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const buttonValue = evt.currentTarget.value;
        initAlert('choose', () => postTrainingNumber(buttonValue));
    });
});