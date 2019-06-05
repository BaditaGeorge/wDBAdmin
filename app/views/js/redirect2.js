ca = document.cookie.split(';');
if(ca[0] === '')
    window.location.pathname = 'app/views/html/mobileLogin.html';