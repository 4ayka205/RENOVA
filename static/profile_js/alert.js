const alert = document.querySelector('#alert');
const yesBtn = alert.querySelector('.yes-btn');
const noBtn = alert.querySelector('.no-btn');
const alertText = alert.querySelector('p');

const initAlert = (option, cb) => {
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
        case 'delete': {
            alertText.textContent = 'Вы уверене, что хотите удалить тренировочный план?';
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
    yesBtn.removeEventListener('click', yesBtn._listener);
    noBtn.removeEventListener('click', noBtn._listener);

    const yesListener = () => {
        cb();
        closeAlert();
    };

    const noListener = () => {
        closeAlert();
    };

    yesBtn.addEventListener('click', yesListener);
    noBtn.addEventListener('click', noListener);

    yesBtn._listener = yesListener;
    noBtn._listener = noListener;
};

const closeAlert = () => {
    alert.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
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
