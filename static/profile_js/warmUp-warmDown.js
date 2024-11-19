const excsWrapper = document.querySelector('.exercises');

const warmUpContainer = excsWrapper.querySelector('.warm-up');

const warmDownContainer = excsWrapper.querySelector('.warm-down')

function getPlanOfWarm(dayData){
    

    const warmUpData = dayData.plan.warmUp;
    getWarmUpDown(warmUpContainer, warmUpData)

    const warmDownData = dayData.plan.warmDown;
    getWarmUpDown(warmDownContainer, warmDownData);

    
}

function getWarmUpDown(warmContainer, warmData){
    const warmlist = document.createElement('ol');
    warmContainer.removeChild(warmContainer.querySelector('ol'));
    warmlist.classList.add('.warm-list');
    warmData.forEach(element => {
        const warmlistElem = document.createElement('li')
        warmlistElem.textContent = element[0];
        if (element.length>1){
            const warmElementList = document.createElement('ul');
            for (let i=1;i<element.length;i++){
                const warmElementListElement = document.createElement('li');
                warmElementListElement.textContent = element[i];
                warmElementList.appendChild(warmElementListElement);
            }
            warmlistElem.appendChild(warmElementList);
        }
        warmlist.appendChild(warmlistElem);
    });
    warmContainer.appendChild(warmlist);
}

export {getPlanOfWarm};