const alert = document.querySelector('#alert');
const yesBtn = alert.querySelector('.yes-btn');
const noBtn = alert.querySelector('.no-btn');
const okBtn = alert.querySelector('.ok-btn');
const alertText = alert.querySelector('p');

// Инициализация модального окна
const initAlert = (option, cb) => {
    alert.classList.remove('hidden');
    alertText.textContent = '';

    // Обновляем текст и кнопки в зависимости от типа алерта
    switch (option) {
        case 'choose': {
            alertText.textContent = 'Вы уверены, что хотите выбрать эту тренировку? В таком случае она появится в личном кабинете, а если вы уже выбирали тренировку, то старая удалится.';
            showButtons(['yes', 'no']);
            break;
        }
        case 'choosen': {
            alertText.textContent = 'Тренировка добавлена в ваш личный кабинет';
            showButtons(['ok']);
            break;
        }
        default: {
            return;
        }
    }

    initAlertBtns(cb);
    document.addEventListener('keydown', onDocumentKeydown);
};

// Показ нужных кнопок
const showButtons = (visibleButtons) => {
    // Прячем все кнопки сначала
    yesBtn.classList.add('hidden');
    noBtn.classList.add('hidden');
    okBtn.classList.add('hidden');

    // Показываем только нужные
    if (visibleButtons.includes('yes')) yesBtn.classList.remove('hidden');
    if (visibleButtons.includes('no')) noBtn.classList.remove('hidden');
    if (visibleButtons.includes('ok')) okBtn.classList.remove('hidden');
};

// Настройка кнопок и обработчиков
const initAlertBtns = (cb) => {
    // Удаляем старые обработчики
    yesBtn.removeEventListener('click', yesBtn._listener);
    noBtn.removeEventListener('click', noBtn._listener);
    okBtn.removeEventListener('click', okBtn._listener);

    // Создаем новые обработчики
    const yesListener = () => {
        cb(); // Выполняем переданную коллбек-функцию
        closeAlert();
    };

    const noListener = () => {
        closeAlert();
    };

    const okListener = () => {
        closeAlert();
    };

    // Добавляем обработчики к кнопкам
    yesBtn.addEventListener('click', yesListener);
    noBtn.addEventListener('click', noListener);
    okBtn.addEventListener('click', okListener);

    // Сохраняем обработчики для дальнейшего удаления
    yesBtn._listener = yesListener;
    noBtn._listener = noListener;
    okBtn._listener = okListener;
};

// Закрытие модального окна
const closeAlert = () => {
    alert.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
};

// Закрытие модального окна по клавише Esc
const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        closeAlert();
    }
};

// Закрытие модального окна при клике вне контента
const onAlertClick = (evt) => {
    const target = evt.target;
    if (!target.classList.contains('alert-content') && target.nodeName !== 'P') {
        closeAlert();
    }
};

// Добавление обработчика клика по самому модальному окну
if (alert) {
    alert.addEventListener('click', onAlertClick);
}

export { initAlert };