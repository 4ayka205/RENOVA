const alert = document.querySelector('#alert');
const yesBtn = alert.querySelector('.yes-btn');
const noBtn = alert.querySelector('.no-btn');
const alertText = alert.querySelector('p');

const initAlert = (option, cb) => {
    alert.classList.remove('hidden');
    alertText.textContent = '';

    switch (option) {
        case 'choose': {
            alertText.textContent = 'Вы уверенны, что хотите выбрать эту тренировку? В таком случае она появится в личном кабинете, а если вы уже выбирали тренировку, то старая удалится.';
            break;
        }
        default: {
            return;
        }
    }
    initAlertBtns(cb);

    document.addEventListener('keydown', onDocumentKeydown);
};


const initAlertBtns = (cb) => {
    yesBtn.removeEventListener('click', yesBtn._listener);
    noBtn.removeEventListener('click', noBtn._listener);

    const yesListener = () => {
        // cb()
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