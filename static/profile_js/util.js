import { getPlanOfDay } from "./get-plan-training.js";
import { userTraining } from "./api.js";


const makeCurrDay = (day) => {
    day.classList.add('current-day');
    
    // Удаляем старое содержимое
    const content = day.querySelector('.day-content');
    if (content) {
        day.removeChild(content);
    }
    
    // Создаём новое содержимое
    const contentTemplate = document.querySelector('#day-content_').content.querySelector('.day-content');
    const newContent = contentTemplate.cloneNode(true);
    day.appendChild(newContent);

    // Обновляем план на день
    const dayKey = Array.from(day.classList).find(cls => cls.startsWith('day_')); // Определяем ключ дня
    if (dayKey) {
        getPlanOfDay(userTraining.days[dayKey]);
    }
};
const weekElements = document.querySelector('.weeks');

const switchWeek = () => {
    for (let i = 0; i < weekElements.children.length; i++) {
        const curWeek = weekElements.children[i];
        if (curWeek.classList.contains('active') && i !== weekElements.children.length - 1) {
            curWeek.classList.remove('active');
            weekElements.children[i + 1].classList.add('active'); 
            return; // Выход из цикла после переключения
        } else if (curWeek.classList.contains('active')) {
            curWeek.classList.remove('active');
            weekElements.children[0].classList.add('active'); 
            return; 
        }
    }
};

const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');
let emptyBox; // Переменная для хранения элемента
let emptyText;
const deleteEmptyContent = () => {
    emptyText = document.createElement('p');
    emptyText.textContent = 'Тренеровка отсутствует, пройдите опрос или выберете одну из предложенных тренировок сами';
    emptyText.classList.add('empty-text');
    mainContent.classList.add('hidden');
    emptyBox = document.createElement('div');
    emptyBox.appendChild(emptyText)
    emptyBox.classList.add('empty-box');
    footer.parentNode.insertBefore(emptyBox, footer);

};
export {makeCurrDay, switchWeek, deleteEmptyContent};