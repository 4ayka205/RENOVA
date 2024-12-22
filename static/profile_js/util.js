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

const noSwitch = [2,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,   37,38,39,40,41];
let switches = 0;
const switchWeek = () => {
    if (switches > 37){
        return; //тут программа пройдена. 
    }
    switches+=1;
    console.log(switches);
    if (noSwitch.includes(switches)){
        return;
    }
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