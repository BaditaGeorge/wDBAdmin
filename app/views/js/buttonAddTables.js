let buttonAddTables= document.getElementById('buttonAddTables');
let classPressButton= document.querySelector('.buttonBeginPress');
let closeButton= document.getElementById('closeButton');

//here is the event for pop-up
buttonAddTables.addEventListener('click', () => {
    classPressButton.classList.add('buttonAfterPress');
    console.log("apasam butonul");
});

//here is the event for close
closeButton.addEventListener('click', () => {
    classPressButton.classList.remove('buttonAfterPress');
});

//here is the event for close with ESC
document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        classPressButton.classList.remove('buttonAfterPress');
        console.log("se scoate clasa");
    }
})
