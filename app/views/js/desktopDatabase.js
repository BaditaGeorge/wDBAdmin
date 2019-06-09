let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];
$database_name=$url.split("/")[4];

let divTables = document.getElementById("tabele");
let divFunctions = document.getElementById("buton");
let divProcedures = document.getElementById("prceds");

let databasesLink=document.getElementById("databasesLink");
databasesLink.setAttribute("href", "/bachsql/databases/" + $user_id);


fetch("/databaseFunctionsApi/tables/" + $user_id +"/"+$database_name)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    for(var index=0; index<myJson.length; index++)
    {   
        var a = document.createElement("a");
        a.innerHTML=myJson[index]["table_name"];
        a.href=$url+"/table/"+myJson[index]["table_name"];
        divTables.appendChild(a);

    }
    
})

fetch("/databaseFunctionsApi/functions/" + $user_id + "/" + $database_name)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
       for(var index=0; index<myJson.length; index++)
       {
            var a = document.createElement("a");
            a.innerHTML=myJson[index]["function_name"];
            a.href=$url+"/function/"+ myJson[index]["function_name"];
            divFunctions.appendChild(a);
       }
})

fetch("/databaseFunctionsApi/procedures/" + $user_id + "/" + $database_name)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
       for(var index=0; index<myJson.length; index++)
       {
            var a = document.createElement("a");
            a.innerHTML=myJson[index]["procedure_name"];
            a.href=$url+"/procedure/"+ myJson[index]["procedure_name"];
            divProcedures.appendChild(a);
       }
})



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
