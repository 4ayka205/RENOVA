import { initAlert } from "./alert.js";
import { deleteWorkout } from "./api.js";

const deleteTrainingBtn = document.querySelector('.delete-program');




deleteTrainingBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    initAlert('delete',() => {
        deleteWorkout();
        window.location.reload();
    });
    
})