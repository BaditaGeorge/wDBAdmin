let addBtn = document.getElementById('Add');
let menu = document.querySelector('.hidden');

addBtn.addEventListener('click', () => {
    menu.classList.add('is--open');
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'Escape' || e.keyCode ===27) {
        menu.classList.remove('is--open');
    }
})
function rmvIt(){
    document.getElementById("idBox").removeChild(this.parentNode);
}
function adevarat(){
    document.getElementsByClassName("divBx").addEventListener('click',rmvIt);
}
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
        ell.dataset.database_name=document.getElementsByClassName("btn")[i].innerHTML;
        ell.addEventListener("click",deleteDatabase);
        document.getElementsByClassName("divBx")[i].appendChild(ell);

    }
    
}
function AddCol(){
    var tag=document.createElement("a");
    var cntM=document.createElement("div");
    tag.className="btn";
    if(document.getElementById("nmn").value=='')
    {
        alert("Database must have a name!");
        return false;
    }
    cntM.position="relative";
    var t=document.createTextNode(document.getElementById("nmn").value);
    tag.appendChild(t);
    cntM.classList.add("divBx");
    cntM.id=(document.getElementsByClassName("divBx").length).toString();
    cntM.appendChild(tag);
    document.getElementById("idBox").appendChild(cntM);
    

    
  
    fetch("/databaseFunctionsApi/databases/" + $user_id + "/" + document.getElementById("nmn").value, {
        method: 'POST'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();
    
    

}


let $url=window.location.pathname;
$user_id=$url.split("/")[3];
let box=document.getElementById("idBox");

fetch("/databaseFunctionsApi/databases/" + $user_id)
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
        a.href="/m.bachsql/database/" + $user_id +"/"+ myJson[index]["database_name"];
        a.innerHTML=myJson[index]["database_name"];
    
        div.appendChild(a);

    }
    
})

function deleteDatabase(e)
{
    fetch("/databaseFunctionsApi/databases/" + $user_id + "/" + e.target.dataset.database_name, {
        method: 'DELETE'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();

}

