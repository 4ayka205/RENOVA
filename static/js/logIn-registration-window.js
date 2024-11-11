let openAccount = document.querySelector('#open_pop_up');
let RegistrationWindow = document.querySelector('#openModal-register');
let LogInWindow = document.querySelector('#openModal-enter');

openAccount.addEventListener('click',function(evt){
    evt.preventDefault();
    LogInWindow.classList.add('open');
})


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
    closeButton.addEventListener('click',function(evt){
        evt.preventDefault();
        currentPopup.classList.remove('open');
    })
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            currentPopup.classList.remove("open")
        }
    });
}

ClosePopup(LogInWindow);
ClosePopup(RegistrationWindow);
