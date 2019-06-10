let buttonAddTables= document.getElementById('buttonAddTables');

buttonAddTables.addEventListener('click', () => {
    buttonAddTables.classList.add('buttonAfterPress');
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
        buttonAddTables.classList.remove('buttonAfterPress');
    }
})