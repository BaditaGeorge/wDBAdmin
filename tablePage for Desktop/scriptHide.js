let menuBtn = document.getElementById('buttonTS');
let menu = document.querySelector('.tableStructure');

menuBtn.addEventListener('click', () => {
    menu.classList.add('is--open');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        menu.classList.remove('is--open');
    }
})