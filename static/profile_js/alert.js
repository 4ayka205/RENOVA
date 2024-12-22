const alert = document.querySelector('#alert');
const yesBtn = alert.querySelector('.yes-btn');
const noBtn = alert.querySelector('.no-btn');
const alertText = alert.querySelector('p');

const initAlert = (option, cb) => {
    // Очистка текста и показ окна
    alert.classList.remove('hidden');
    alertText.textContent = '';

    switch (option) {
        case 'skeep': {
            alertText.textContent = 'Вы уверены, что хотите пропустить тренировку? Это повлияет на расчёт комфортных весов для следующей тренировочной недели.';
            break;
        }
        case 'complete': {
            alertText.textContent = 'Вы уверены, что хотите завершить тренировку? В таком случае, мы предложим вам пройти опрос для расчёта оптимальных весов.';
            break;
        }
        default: {
            return; // Выходим, если опция не распознана
        }
    }
    initAlertBtns(cb);

    document.addEventListener('keydown', onDocumentKeydown);
};


const initAlertBtns = (cb) => {
    yesBtn.replaceWith(yesBtn.cloneNode(true));
    noBtn.replaceWith(noBtn.cloneNode(true));

    const newYesBtn = alert.querySelector('.yes-btn');
    const newNoBtn = alert.querySelector('.no-btn');

    newYesBtn.addEventListener('click', () => {
        cb();
        closeAlert();
    });

    newNoBtn.addEventListener('click', () => {
        closeAlert();
    });
};

const closeAlert = () => {
    alert.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    const clonedYesBtn = yesBtn.cloneNode(true); // Создаем копию кнопки
    yesBtn.replaceWith(clonedYesBtn); // Заменяем кнопку на копию (удаляются все обработчики)


    if (noBtn) {
        const clonedNoBtn = noBtn.cloneNode(true); // Создаем копию кнопки
        noBtn.replaceWith(clonedNoBtn); // Заменяем кнопку на копию (удаляются все обработчики)
    }
};

const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        closeAlert();
    }
};


const onAlertClick = (evt) => {
    const target = evt.target;
    if (!target.classList.contains('alert-content') && target.nodeName !== 'P') {
        alert.classList.add('hidden');
        closeAlert();
    }
};

if (alert) {
    alert.addEventListener('click', onAlertClick);
}



export {initAlert};
