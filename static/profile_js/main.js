import './get-title-training.js';
import {userTraining} from './data.js'
import {getPlanOfDay} from './get-plan-training.js'


getPlanOfDay(userTraining.days.day_1);

//нужно будет вынести в отдельный файл содержимое ниже
const checkBtn = document.querySelector('.check-btn');

document.querySelector('.days').addEventListener('click', evt => {
    const target = evt.target;

    // Если нажали на кнопку с классом check-btn
    if (target.classList.contains('check-btn')) {
        evt.preventDefault();
        const parent = target.closest('.day'); // Ищем ближайший родитель с классом day
        Object.keys(userTraining.days).forEach(elem => {
            if (userTraining.days[elem].title === parent.querySelector('h4').textContent) {
                getPlanOfDay(userTraining.days[elem]);
                return;
            }
        });
    }

    // Если нажали на блок с классом current-day (или его дочерний элемент)
    const dayBlock = target.closest('.day');
    if (dayBlock?.classList.contains('current-day') && !target.classList.contains('skeep-btn') && !target.classList.contains('get-btn') && !target.classList.contains('complete-btn') ) {
        Object.keys(userTraining.days).forEach(elem => {
            if (userTraining.days[elem].title === dayBlock.querySelector('h4').textContent) {
                getPlanOfDay(userTraining.days[elem]);
                return;
            }
        });
    }
});
