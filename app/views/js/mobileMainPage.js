let menuBtn = document.getElementById('menuBtn');
let menu = document.querySelector('.mnuCnt');

menuBtn.addEventListener('click', () => {
    menu.classList.add('is--open');
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'Escape' || e.keyCode ===27) {
        menu.classList.remove('is--open');
    }
})
function AddElement()
{
    var tag=document.createElement("div");
    tag.style.width="70%";
    tag.style.height="40%";
    tag.style.backgroundImage="url(2.jpg)";
    tag.style.position="absolute";
    tag.style.borderRadius="5%";
    tag.style.opacity="0.8";
    tag.style.top="15%";
    tag.style.left="15%";
    var pEl=document.createElement("input");
    var pLab=document.createElement("label");
    pLab.innerText="E-Mail Adress!";
    pLab.style.marginTop="20%";
    pLab.style.display="block";
    pLab.style.fontFamily="Comic Sans MS";
    pLab.style.fontSize="28px";
    pEl.type="text";
    pEl.style.marginTop="8%";
    pEl.style.width="60%";
    pEl.style.height="10%";
    var pBt=document.createElement("button");
    pBt.innerText="Submit";
    pBt.style.display="block";
    pBt.style.borderRadius="12%";
    pBt.style.backgroundSize="100% 100%";
    pBt.style.backgroundColor="transparent";
    pBt.style.border="2px solid white";
    pBt.style.color="white";
    pBt.style.paddingLeft="5%";
    pBt.style.paddingRight="5%";
    pBt.style.marginLeft="35%";
    pBt.style.marginTop="10%";
    pBt.style.height="60px";
    pBt.style.width="80px";
    tag.appendChild(pLab);
    tag.appendChild(pEl);
    tag.appendChild(pBt);
    tag.style.color="white";
    document.getElementById("mnFrm").appendChild(tag);
}
function whichEl()
{
    menu.classList.remove("is--open");
}


let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];

let queryTextArea = document.getElementById("queryArea");
let schemaTextArea = document.getElementById("schemaArea");


fetch("/databaseFunctionsApi/mainpage/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    
       queryTextArea.value=myJson['query_text_area'];
       schemaTextArea.value=myJson['schema_text_area'];

})

schemaTextArea.addEventListener("click", schemaOnClick);
queryTextArea.addEventListener("click", queryOnClick);

function schemaOnClick(){
    current_focus=schemaTextArea;
}
function queryOnClick(){
    current_focus=queryTextArea;
}

let selectDatabase=document.getElementById("selectDatabase");
var option1=document.createElement("option");
option1.value="Default database";
option1.innerHTML="Default database";
selectDatabase.appendChild(option1);

fetch("/databaseFunctionsApi/databases/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    for(var index=0; index<myJson.length; index++)
    {
        var option=document.createElement("option");
        option.value=myJson[index]["database_name"];
        option.innerHTML=myJson[index]["database_name"];
        selectDatabase.appendChild(option);
      
    }
    var option2=document.createElement("option");
    option2.value="Create new database";
    option2.innerHTML="Create new database";
    selectDatabase.appendChild(option2);
    selectDatabase.addEventListener("click", createDatabaseRedirect);
    
})    
let queryResult=document.getElementById("queryResult");
let schemaResult=document.getElementById("schemaResult");
let qqueryText=document.getElementById("qtextResult")
let sschemaText=document.getElementById("stextResult");

let runButton=document.getElementById("runBtn");
runButton.addEventListener("click",runOnClick);



function runOnClick(){

    let databaseName=selectDatabase.value;
    let url="/databaseFunctionsApi/mainpage/" + $user_id +"_"+databaseName+ "/run";
    if(selectDatabase.value==="Default database")
    url="/databaseFunctionsApi/mainpage/" + $user_id +"/run";

    
    if(current_focus===schemaTextArea)
    {
    
        fetch(url, {
            method: 'POST',
            body: schemaTextArea.value 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson){
                if ( schemaResult.classList.contains("hidden"))
                schemaResult.classList.remove("hidden");
               
                sschemaText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                if ( schemaResult.classList.contains("hidden"))
                schemaResult.classList.remove("hidden");
    
                sschemaText.innerHTML=myJson["response"];
               
            }
        }) 
    }   
    else if(current_focus===queryTextArea)
    {   
        
        fetch(url, {
            method: 'POST',
            body: queryTextArea.value
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson){
                if ( queryResult.classList.contains("hidden"))
                queryResult.classList.remove("hidden");
               
                qqueryText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                if ( queryResult.classList.contains("hidden"))
               queryResult.classList.remove("hidden");
    
                qqueryText.innerHTML=myJson["response"];
               
            }
        }) 
    }

    
}


function createDatabaseRedirect()
{
    if(selectDatabase.value==="Create new database")
    window.location.href="/m.bachsql/databases/" + $user_id;
    else if(selectDatabase.value==="Default database")
    {
        fetch("/databaseFunctionsApi/mainpage/" + $user_id )
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            
            queryTextArea.value=myJson['query_text_area'];
            schemaTextArea.value=myJson['schema_text_area'];

        })

    }
    else{
        
        fetch("/databaseFunctionsApi/mainpage/" + $user_id + '_' + selectDatabase.value)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            
            queryTextArea.value=myJson['query_text_area'];
            schemaTextArea.value=myJson['schema_text_area'];

        })
    }
}

let saveButton=document.getElementById("saveBtn");
saveButton.addEventListener("click", saveOnClick);

function saveOnClick(){

    let sendJson={schema:schemaTextArea.value, query:queryTextArea.value};
 
    
    if(selectDatabase.value==="Default database")
       databaseName=$user_id;
    else
        databaseName=selectDatabase.value;

    url="/databaseFunctionsApi/mainpage/save/" +  $user_id +"/" + databaseName;
    fetch(url, {
        method: 'PUT',
        header:'Content-type: application/json',
        body: JSON.stringify(sendJson)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        if ( schemaResult.classList.contains("hidden"))
                    schemaResult.classList.remove("hidden");

        
         sschemaText.innerHTML=myJson["response"];

         if ( queryResult.classList.contains("hidden"))
         queryResult.classList.remove("hidden");

       
         qqueryText.innerHTML=myJson["response"];
                
    })


}