let menuBtn = document.getElementById('generateButton');
let menu = document.querySelector('.dropMenuGenerate');

menuBtn.addEventListener('click', () => {
    menu.classList.add('isOpen');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menu.classList.remove('isOpen');
    }
})