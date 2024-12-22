import {makeCurrDay} from "./util.js"
import {userTraining} from "./api.js";

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



async function getDaysCards() { // Получение/отображение блока с днями
    const daysWrapper = document.querySelector('.days');
    const end = document.querySelector('.column');
    
    const dayKeys = Object.keys(userTraining.days); // Получаем ключи дней
    
    for (let i = 0; i < dayKeys.length; i++) {
        const dayCard = await getDayCard(dayKeys[i]); // Ждём карточку дня
        daysWrapper.insertBefore(dayCard, end); // Вставляем в DOM
    }
}

async function getDayCard(trainingKey) {
    // Получаем данные userTraining
    
    // Создаем копию шаблона и заполняем данными
    const day = dayTemplate.cloneNode(true);
    const data = userTraining.days[trainingKey];
    day.classList.add(String(trainingKey));
    day.querySelector('h4').textContent = data.title;
    const img = day.querySelector('img');
    img.src = data.imgUrl;
    img.alt = data.title;
    
    // Устанавливаем текущий день для day_1
    if (trainingKey === 'day_1') {
        makeCurrDay(day);
    }
    
    return day; // Возвращаем day только после выполнения всех операций
}

