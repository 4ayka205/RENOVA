function filterCards() {
    // Получаем все карточки
    const cards = document.querySelectorAll('.card');

    // Получаем состояние чекбоксов для уровня подготовки
    const isNoviceChecked = document.getElementById('novice').checked;
    const isIntermediateChecked = document.getElementById('intermediate').checked;
    const isAdvancedChecked = document.getElementById('advanced').checked;

    // Получаем состояние чекбоксов для целей
    const isSlimChecked = document.getElementById('goal-slim').checked;
    const isMassChecked = document.getElementById('goal-mass').checked;
    const isMaintainChecked = document.getElementById('goal-maintain').checked;

    // Получаем состояние чекбоксов для места
    const isGymChecked = document.getElementById('place-gym').checked;
    const isHomeChecked = document.getElementById('place-home').checked;

    // Получаем состояние чекбоксов для пола
    const isMaleChecked = document.getElementById('gender-male').checked;
    const isFemaleChecked = document.getElementById('gender-female').checked;

    // Получаем состояние чекбоксов для специальных фильтров
    const isEquipmentChecked = document.getElementById('special-equipment').checked;

    // Проходим по всем карточкам и скрываем/показываем их
    cards.forEach(card => {
        const level = card.getAttribute('data-level');
        const goal = card.getAttribute('data-goal');
        const place = card.getAttribute('data-place');
        const gender = card.getAttribute('data-gender');
        const special = card.getAttribute('data-special');

        // Проверяем условия для отображения карточки
        const levelMatch = (isNoviceChecked && level === 'novice') ||
                           (isIntermediateChecked && level === 'intermediate') ||
                           (isAdvancedChecked && level === 'advanced');

        const goalMatch = (isSlimChecked && goal === 'slim') ||
                          (isMassChecked && goal === 'mass') ||
                          (isMaintainChecked && goal === 'maintain');

        const placeMatch = (isGymChecked && place === 'gym') ||
                           (isHomeChecked && place === 'home');

        const genderMatch = (isMaleChecked && gender === 'male') ||
                            (isFemaleChecked && gender === 'female');

        const specialMatch = isEquipmentChecked && special === 'equipment';

        // Проверяем, соответствует ли карточка всем выбранным фильтрам
        const isVisible = (levelMatch || !isNoviceChecked && !isIntermediateChecked && !isAdvancedChecked) &&
                          (goalMatch || !isSlimChecked && !isMassChecked && !isMaintainChecked) &&
                          (placeMatch || !isGymChecked && !isHomeChecked) &&
                          (genderMatch || !isMaleChecked && !isFemaleChecked) &&
                          (specialMatch || !isEquipmentChecked);

        // Если карточка соответствует всем выбранным фильтрам, показываем её
        if (isVisible) {
            card.style.display = 'inline-block'; // Показываем карточку
        } else {
            card.style.display = 'none'; // Скрываем карточку
        }
    });

    // Если ни один чекбокс не выбран, показываем все карточки
    if (!isNoviceChecked && !isIntermediateChecked && !isAdvancedChecked &&
        !isSlimChecked && !isMassChecked && !isMaintainChecked &&
        !isGymChecked && !isHomeChecked &&
        !isMaleChecked && !isFemaleChecked &&
        !isEquipmentChecked) {
        cards.forEach(card => {
            card.style.display = 'inline-block';
        });
    }
}

/*
const filterBox = document.querySelectorAll('.training-card');

const filterGoods = filterClass =>{
    filterBox.forEach(item => {
        item.classList.remove('hide');
        if (!item.classList.contains(filterClass)){
            item.classList.add('hide');
        }
    })
}

document.querySelector('filters-header').addEventListener('click', event =>{
    if (event.target.tagName !== 'dropdown-item') return;

    let filterClass = event.target.dataset['f'];
    filterGoods(filterClass);
});

*/