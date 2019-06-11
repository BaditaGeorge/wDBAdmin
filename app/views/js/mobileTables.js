function removeF()
{
   
        /*ell.onclick=function(){
            alert('MESAJ!');
            document.getElementById("idBox").removeChild(this.parentNode);
        };*/
    for(var i=0;i<document.getElementsByClassName("divBx").length;i++)
    {
        var ell=document.createElement('button');
        ell.innerText="X";
        ell.style.fontSize="15px";
        ell.style.backgroundColor="#ff6666";
        ell.style.color="white";
        ell.style.border="none";
        ell.style.position="absolute";
        ell.style.top="26%";
        ell.style.left="-15%";
        ell.style.borderRadius="50%";
        ell.dataset.table_name=document.getElementsByClassName("btn")[i].innerHTML;
        ell.addEventListener('click',deleteTable);

        document.getElementsByClassName("divBx")[i].appendChild(ell);
    }        
}

let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];
$database_name=$url.split("/")[4];

let box=document.getElementById("idBox");

fetch("/databaseFunctionsApi/tables/" + $user_id +"/"+$database_name)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    for(var index=0; index<myJson.length; index++)
    {   
    
        var div = document.createElement("div");
        div.classList.add("divBx");
       
        box.appendChild(div);

        var a= document.createElement("a");
        a.classList.add("btn");
        a.onmousedown="mouseDown()";
        a.href="/m.bachsql/table/" + $user_id +"/"+ $database_name + "/"+myJson[index]["table_name"];
        a.innerHTML=myJson[index]["table_name"];
    
        div.appendChild(a);

    }
    
})

function deleteTable(e)
{   
    var table_obj={table_name:e.target.dataset.table_name};
    fetch("/databaseFunctionsApi/tables/" + $user_id + "/" + $database_name, {
        method: 'DELETE',
        body:JSON.stringify(table_obj)
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();
}

let addBtn = document.getElementById('Add');
let menu = document.querySelector('.hidden');

addBtn.addEventListener('click', () => {
    menu.classList.add('is--open');
});


let createBtn=document.getElementById("create");
createBtn.addEventListener("click",createTable);

function createTable()
{
    let table_name=document.getElementById("nmn").value;
    let nr_of_columns=document.getElementById("numberOfColumns").value;
    window.location.pathname="m.bachsql/createtable/"+$user_id+'/'+$database_name+'/'+table_name+'/'+nr_of_columns;
}