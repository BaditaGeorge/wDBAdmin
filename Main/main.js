let menuBtn = document.getElementById('buttonImg');
let menu = document.querySelector('.dropMenu');

menuBtn.addEventListener('click', () => {
    menu.classList.add('is--open');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menu.classList.remove('is--open');
    }
})

let btnGenerate = document.getElementById('generateButton');
let menuGenerate = document.querySelector('.dropMenuGenerate');

btnGenerate.addEventListener('click', () => {
    menuGenerate.classList.add('isOpen');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menuGenerate.classList.remove('isOpen');
    }
})

let btnInvite = document.getElementById('collaborateSpan');
let menuInvite = document.querySelector('.Invitation');

btnInvite.addEventListener('click', () => {
    menuInvite.classList.add('is-Open');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menuInvite.classList.remove('is-Open');
    }
})

