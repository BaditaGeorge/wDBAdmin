
let $url=window.location.pathname;
$user_id=$url.split("/")[3];

var canvas = document.createElement("div");
canvas.classList.add("toate");


fetch("/databaseFunctionsApi/databases/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {

    if(!myJson.length){
        console.log("gol");
        var addBtn=document.createElement("button");
        addBtn.id="noDBS";
        addBtn.innerHTML="Add database";
        addBtn.addEventListener("click",addOnClick);
        var header = document.querySelector("header");
        header.appendChild(addBtn);
    }

    for(var index=0; index<myJson.length; index++)
    {
        var div = document.createElement("div");
        div.classList.add("table");
        if(index==0)
        {
            div.id="buton";
            var addBtn=document.createElement("button");
            addBtn.id="generate";
            addBtn.innerHTML="Add";
            addBtn.addEventListener("click",addOnClick);
            div.appendChild(addBtn);
        }
        canvas.appendChild(div);

        var p = document.createElement("p");
        p.classList.add("culoare");
        p.innerHTML=myJson[index]["database_name"];
        div.appendChild(p);

        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("save");
        deleteBtn.innerHTML="Delete";
        div.appendChild(deleteBtn);
        deleteBtn.dataset.user_id=$user_id;
        deleteBtn.dataset.database_name=myJson[index]["database_name"];
        deleteBtn.addEventListener("click",deleteOnClick);

        var codeBtn = document.createElement("button");
        codeBtn.classList.add("code");
        codeBtn.innerHTML="Generate code";
        div.appendChild(codeBtn);

        

    }
    
})

document.body.appendChild(canvas);

function deleteOnClick(e){

    //maybe add a pop-up: are you sure you want to delete this
    fetch("/databaseFunctionsApi/databases/" + e.target.dataset.user_id + "/" + e.target.dataset.database_name, {
        method: 'DELETE'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();


}

function addOnClick(){

    var form = document.createElement("div");
    form.classList.add("table");
    var divInput= document.createElement("div");
    var input = document.createElement("input");
    input.type="text";
    input.id="inputId";
    divInput.appendChild(input);
    divInput.classList.add("culoare");
    form.appendChild(divInput);
    var createBtn = document.createElement("button");
    createBtn.classList.add("save");
    createBtn.innerHTML="Create database";
    createBtn.dataset.user_id=$user_id;
    //TO DO: check if input is null 
 
    createBtn.addEventListener("click", createOnClick)
    form.appendChild(createBtn);
    canvas.appendChild(form);

    var divButon = document.getElementById("buton");
    var addButon = document.getElementById("generate");
    if(!addButon) 
    {   console.log("null");
        addButon=document.getElementById("noDBS");
     
        divButon=document.querySelector("header");
    }

    divButon.removeChild(addButon);
    
}

function createOnClick(e){

    //TO DO: check if it already exists
  
    var input=document.getElementById("inputId").value;
    console.log(input);
    
  
    fetch("/databaseFunctionsApi/databases/" + e.target.dataset.user_id + "/" + input, {
        method: 'POST'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();

}