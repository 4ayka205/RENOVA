import { userTraining } from './api.js';
import { makeCurrDay} from './util.js';
import {initAlert} from './alert.js';
import { getPlanOfDay } from './get-plan-training.js';
import { switchWeek } from './util.js';

const daysWrapper = document.querySelector('.days');
const dayTemplate = document.querySelector('#day');


let switches = 0;
const switchDay = (parent) => {
    const daysWrapper = document.querySelector('.days');
    const curDay = parent.classList[1];
    parent.classList.remove('current-day');
    const curDayContent = parent.querySelector('.day-content');
    const newDayContent = dayTemplate.content.querySelector('.day-content').cloneNode(true);
    curDayContent.replaceWith(newDayContent);
    let nextDay;
    switch (curDay){
        case ('day_1'):{
            nextDay = daysWrapper.querySelector('.day_2');
            switches+=1;
            break;
        }
        case ('day_2'):{
            nextDay = daysWrapper.querySelector('.day_3');
            switches+=1;
            break;
        }
        case ('day_3'):{
            nextDay = daysWrapper.querySelector('.day_1');
            switches+=1;
            if (switches % 3 == 0){
                switchWeek();
            }
            switches = 0;
            break;
        }
        default:{
            break;
        }
    }
    makeCurrDay(nextDay);
};
if (userTraining){
    const daysKeys =  Object.keys(userTraining.days);

    daysWrapper.addEventListener('click', (evt) => {
        const target = evt.target;
        evt.preventDefault();
        const parent = target.closest('.day');
        // Если нажали на кнопку с классом check-btn
        if (target.classList.contains('check-btn')) {
            if (parent) {
                const dayTitle = parent.querySelector('h4')?.textContent;
                if (dayTitle) {
                    daysKeys.forEach((elem) => {
                        if (userTraining.days[elem].title === dayTitle) {
                            getPlanOfDay(userTraining.days[elem]);
                            return;
                        }
                    });
                }
            }
        }

        // Если нажали на кнопку пропустить день
        if (target.classList.contains('skeep-btn')) {
            if (parent) {
                initAlert('skeep', () => {
                    switchDay(parent);
                });
                
            }
        }

        // Если нажали на кнопку завершить день
        if (target.classList.contains('complete-btn')) {
            if (parent) {
                initAlert('complete', () => {
                    switchDay(parent);
                });
            }
        }

        // Если нажали на блок с классом current-day (или его дочерний элемент)
        const dayBlock = target.closest('.day');
        if (dayBlock?.classList.contains('current-day') && !target.classList.contains('skeep-btn') && !target.classList.contains('get-btn') && !target.classList.contains('complete-btn') ) {
            daysKeys.forEach(elem => {
            if (userTraining.days[elem].title === dayBlock.querySelector('h4').textContent) {
                getPlanOfDay(userTraining.days[elem]);
                return;
            }
            });
        }
    });
}


