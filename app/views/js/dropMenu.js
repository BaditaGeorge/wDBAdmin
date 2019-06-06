let menuBtn2 = document.getElementById('generateButton');
let menu2 = document.querySelector('.dropMenuGenerate');

menuBtn2.addEventListener('click', () => {
    menu2.classList.add('isOpen');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menu2.classList.remove('isOpen');
    }
})