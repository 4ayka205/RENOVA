//let openAccount = document.querySelector('#open_pop_up');
const openAccountButtons = document.querySelectorAll('.open-modal');
let RegistrationWindow = document.querySelector('#openModal-register');
let LogInWindow = document.querySelector('#openModal-enter');

// открытие попапа входа в лк по кнопке пользователя
//if (openAccount){
//    openAccount.addEventListener('click', (evt) => {
//        evt.preventDefault();
//        LogInWindow.classList.add('open');
//    })
//}

// открытие попапа входа в лк по кнопке
const openModal = (evt) => {
    evt.preventDefault();
    LogInWindow.classList.add('open');
};

openAccountButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

//смена попапов по кнопке
const SwitchPopUp = (currentPopup, neededPopup) => {
    let switchButton = currentPopup.querySelector('.switch-popup')
    switchButton.addEventListener('click',function(evt){
        evt.preventDefault();
        currentPopup.classList.remove('open');
        neededPopup.classList.add('open');
    })
}


SwitchPopUp(LogInWindow, RegistrationWindow);
SwitchPopUp(RegistrationWindow, LogInWindow);


const ClosePopup = (currentPopup)=>{
    let closeButton = currentPopup.querySelector('.close');
    closeButton.addEventListener('click', (evt) => { //закрытие по крестику
        evt.preventDefault();
        currentPopup.classList.remove('open');
    })
    window.addEventListener('keydown', (evt) => { //закрытие чеоез esc
        if (evt.key === "Escape") {
            currentPopup.classList.remove("open")
        }
    });
    currentPopup.addEventListener('click', (event) => { //закрытие по клику на пустуе пространство
        if (event.target === currentPopup) {
          currentPopup.classList.remove('open');
        }
      });
}

ClosePopup(LogInWindow);
ClosePopup(RegistrationWindow);

//Внизу пытался сделать переход в личный кабинет, не разобрался(

 let logInBtn = LogInWindow.querySelector('.btn-model');
 let RegistrationBtn = RegistrationWindow.querySelector('.btn-module');

 logInBtn.addEventListener('click', (e)=>{
     if (localStorage.getItem('authToken')){ //Вместо true должна быть проверка на валидность введённых данных
         window.open('profile/')
     }

 });