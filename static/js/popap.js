document.getElementById("open_pop_up").addEventListener("click", function(){
    document.getElementById("openModal-register").classList.add("open")
});


document.getElementById("btn_swap_popUp").addEventListener("click", function(){
    document.getElementById("openModal-enter").classList.add("open")
});


document.querySelector("#openModal-register .modal-content").addEventListener('click', event => {
    event._isClicWithInModal = true;
});
document.getElementById("openModal-register").addEventListener('click', event => {
        if (event._isClicWithInModal) return;
        event.currentTarget.classList.remove('open');
});


window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("openModal-register").classList.remove("open")
    }
});