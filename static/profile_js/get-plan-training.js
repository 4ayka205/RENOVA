import {getPlanOfWarm} from './warmUp-warmDown.js'

const planTitle = document.querySelector('.program-article');

function getPlanOfDay(dayData){
    planTitle.textContent = dayData.title;
    getPlanOfWarm(dayData);
    const excsWrapper = document.querySelector('.exercises');
    let content = excsWrapper.querySelectorAll('div');
    content.forEach(element => {
        if (!element.classList.contains('warm-up') && !element.classList.contains('warm-down')) {
            element.remove();
        }
    });
    let index = 1;
    Object.keys(dayData.plan).forEach(exc=>{
        if (exc =='warmUp' || exc =='warmDown'){
            return;
        }
        const excTemplate = document.querySelector('#exc').content.querySelector('.exercise');
        const excWrapp = excTemplate.cloneNode(true);
        const data = dayData.plan[exc];
        excWrapp.querySelector('p').textContent = `${index.toString()}.${data.value.title}`;
        const excList=excWrapp.querySelector('ul').querySelectorAll('li');
        excList[0].textContent += data.value.app;
        excList[1].textContent += data.value.repeat;
        excList[2].querySelector('.weight').textContent = getWheight();
        excWrapp.querySelector('img').src = data.imgUrl;
        index++;
        excsWrapper.insertBefore(excWrapp, excsWrapper.querySelector('.warm-down'));
    })
}

function getWheight(){
    return '...';
}

export {getPlanOfDay};