import { userTraining } from "./data.js";
import {makeCurrDay} from "./util.js"

const dayTemplate = document.querySelector('#day').content.querySelector('div');

function getTrainingGeneral(){ //Получение и отображение титульного листа тренировки. Всё берётся из userTraining, а не из начальной вёрстки(Кроме примечания)
    const name = document.querySelector('#name');
    name.textContent = userTraining.name;

    const description = document.querySelector('#description');
    description.textContent = userTraining.description;

    getWeeksListElem();

    getDaysCards();
}

getTrainingGeneral();

function getWeeksListElem(){ //Получение и отображение блока с кол-вом недель.
    const weeksList = document.querySelector('.weeks');
    weeksList.innerHTML='';
    for (let i=1; i<=userTraining.weeks;i++){
        const weekElement = document.createElement('li');
        weekElement.classList.add('week')
        weekElement.textContent = i;
        if (i===1){
            weekElement.classList.add('active') // может потом будет отдельная функция, которая также будет изменять план(веса) тренировки. Пока хз, как делать
        }
        weeksList.appendChild(weekElement);
    }
}



function getDaysCards(){ //Получение/отображение блока с днями
    const daysWrapper = document.querySelector('.days');
    const end = document.querySelector('.column');
    for (let i=0;i<Object.keys(userTraining.days).length;i++){
        daysWrapper.insertBefore((getDayCard(Object.keys(userTraining.days)[i])),end);
    }
}

function getDayCard(trainingKey){ //Получение карточки с днём
    const day = dayTemplate.cloneNode(true);
    const data = userTraining.days[trainingKey];
    day.querySelector('h4').textContent = data.title;
    const img = day.querySelector('img');
    img.src = data.imgUrl;
    img.alt = data.title;
    if(trainingKey=='day_1'){
        makeCurrDay(day)
        day.classList.add('current-day');
    }
    return day;
}

