
function makeCurrDay(day){ //Делает день текущем
    day.classList.add('current-day');
    let content =day.querySelector('.day-content');
    day.removeChild(content)
    const contentTemplate = document.querySelector('#day-content_').content.querySelector('.day-content')
    content =contentTemplate.cloneNode(true);
    day.appendChild(content);
}

export {makeCurrDay};