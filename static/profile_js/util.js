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
export {makeCurrDay, switchWeek};