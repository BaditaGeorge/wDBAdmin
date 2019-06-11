function invita(){
    var info = document.getElementById('inviteMail').value;
    fetch('../../collaborationService/api/mailApi.php',{
        method: 'POST',
        body: JSON.stringify({a:info}),
        headers:{'Content-type':'application/json'}
    })
}
function eveniment(){
    document.getElementById('leftArea').addEventListener('keydown',onkDL);
    document.getElementById('leftArea').addEventListener('keypress',onkPL);
    document.getElementById('rightArea').addEventListener('keydown',onkDD);
    document.getElementById('rightArea').addEventListener('keypress',onkPD);
    window.setTimeout(recCheckD,50);
    window.setTimeout(recCheckL,50);
}
function onkPL(e){
    var pos = document.getElementById('leftArea').selectionStart;
    var loc = 'baza';
    fetch('../../collaborationService/api/collaborationApi.php',{
        method: 'POST',
        body: JSON.stringify({a:String.fromCharCode(e.keyCode),b:pos,c:loc}),
        headers: {'Content-type':'application/json'}
    })
}
function onkDL(e){
    if(e.keyCode === 8){
        var pos = document.getElementById('leftArea').selectionStart;
        var loc = 'baza';
        var info = 'backspace';
        fetch('../../collaborationService/api/collaborationApi.php',{
            method:'POST',
            body: JSON.stringify({a:info,b:pos,c:loc}),
            headers: {'Content-type':'application/json'}
        })
    }
}
function onkPD(e){
    var pos = document.getElementById('rightArea').selectionStart;
    var loc = 'baza2';
    fetch('../../collaborationService/api/collaborationApi.php',{
        method:'POST',
        body: JSON.stringify({a:String.fromCharCode(e.keyCode),b:pos,c:loc}),
        headers: {'Content-type':'application/json'}
    })
}
function onkDD(e){
    if(e.keyCode === 8){
        var pos = document.getElementById('rightArea').selectionStart;
        var loc = 'baza2';
        var info = 'backspace';
        fetch('../../collaborationService/api/collaborationApi.php',{
            method:'POST',
            body: JSON.stringify({a:info,b:pos,c:loc}),
            headers: {'Content-type':'application/json'}
        })
    }
}
function recCheckL(){
    var pos = document.getElementById('leftArea').selectionStart;
    fetch('../../collaborationService/api/getApiL.php',{
        method:'GET'
    })
    .then(function(response){
        return response.text();
    })
    .then(function(myData){
        var str = String(document.getElementById('leftArea').value);
        var str2 = String(myData);
        if(str.length !== str2.length){
            document.getElementById('leftArea').value = str2;
        }
    })
    document.getElementById('leftArea').selectionStart = pos;
    var t = window.setTimeout(recCheckL,50);
}
function recCheckD(){
    var pos = document.getElementById('rightArea').selectionStart;
    fetch('../../collaborationService/api/getApiR.php',{
        method:'GET'
    })
    .then(function(response){
        return response.text();
    })
    .then(function(myData){
        var str = String(document.getElementById('rightArea').value);
        var str2 = String(myData);
        if(str.length !== str2.length){
            document.getElementById('rightArea').value = str2;
        }
    })
    document.getElementById('rightArea').selectionStart = pos;
    var t = window.setTimeout(recCheckD,50);
}