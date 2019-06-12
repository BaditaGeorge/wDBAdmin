function invita(){
    // var info = document.getElementById('inviteMail').value;
    // fetch('../../collaborationService/api/mailApi.php',{
    //     method: 'POST',
    //     body: JSON.stringify({a:info}),
    //     headers:{'Content-type':'application/json'}
    // })
    var info = 'Create';
    var info2 = document.getElementById('selectDatabase').value;
    alert('Allgood');
    fetch('app/collaborationService/api/collaborationApi.php',{
        method: 'POST',
        body: JSON.stringify({a:window.location.href,b:document.getElementById('inviteMail').value,c:info,d:info2}),
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
    var info2 = document.getElementById('selectDatabase').value;
    fetch('app/collaborationService/api/collaborationApi.php',{
        method: 'POST',
        body: JSON.stringify({a:String.fromCharCode(e.keyCode),b:pos,c:loc,d:info2,e:window.location.href}),
        headers: {'Content-type':'application/json'}
    })
}
function onkDL(e){
    if(e.keyCode === 8){
        var pos = document.getElementById('leftArea').selectionStart;
        var loc = 'baza';
        var info = 'backspace';
        var info2 = document.getElementById('selectDatabase').value;
        fetch('app/collaborationService/api/collaborationApi.php',{
            method:'POST',
            body: JSON.stringify({a:info,b:pos,c:loc,d:info2,e:window.location.href}),
            headers: {'Content-type':'application/json'}
        })
    }
}
function onkPD(e){
    var pos = document.getElementById('rightArea').selectionStart;
    var loc = 'baza2';
    var info2 = document.getElementById('selectDatabase').value;
    fetch('app/collaborationService/api/collaborationApi.php',{
        method:'POST',
        body: JSON.stringify({a:String.fromCharCode(e.keyCode),b:pos,c:loc,d:info2,e:window.location.href}),
        headers: {'Content-type':'application/json'}
    })
}
function onkDD(e){
    if(e.keyCode === 8){
        var pos = document.getElementById('rightArea').selectionStart;
        var loc = 'baza2';
        var info = 'backspace';
        var info2 = document.getElementById('selectDatabase').value;
        fetch('app/collaborationService/api/collaborationApi.php',{
            method:'POST',
            body: JSON.stringify({a:info,b:pos,c:loc,d:info2,e:window.location.href}),
            headers: {'Content-type':'application/json'}
        })
    }
}
function recCheckL(){
    var pos = document.getElementById('leftArea').selectionStart;
    var info2 = document.getElementById('selectDatabase').value;
    fetch('app/collaborationService/api/getApiL.php',{
        method:'POST',
        body: JSON.stringify({a:info2,b:window.location.href}),
        headers: {'Content-type':'application/json'}
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
    var info2 = document.getElementById('selectDatabase').value;
    fetch('app/collaborationService/api/getApiR.php',{
        method:'POST',
        body: JSON.stringify({a:info2,b:window.location.href}),
        headers: {'Content-type':'application/json'}
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