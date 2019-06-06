
let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];


let queryTextArea = document.getElementById("rightArea");
let schemaTextArea = document.getElementById("leftArea");
let queryResult=document.getElementById("queryResult");
let schemaResult=document.getElementById("schemaResult");
let qqueryText=document.getElementById("qtextResult")
let sschemaText=document.getElementById("stextResult");
let databasesLink=document.getElementById("dbLink");

databasesLink.setAttribute("href", "/bachsql/databases/" + $user_id);



//check if cookie expired if it didn't get the text-areas

fetch("/databaseFunctionsApi/mainpage/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    
    if(myJson['main_page'])
    {
       queryTextArea.value=myJson['query_text_area'];
       schemaTextArea.value=myJson['schema_text_area'];
    }

})

schemaTextArea.addEventListener("click", schemaOnClick);
queryTextArea.addEventListener("click", queryOnClick);


let runButton=document.getElementById("runBtn");
runButton.addEventListener("click",runOnClick);

function runOnClick(){

    if(current_focus===schemaTextArea)
    {
        schemaText=schemaTextArea.value;

        fetch("/databaseFunctionsApi/mainpage/" + $user_id + "/run", {
            method: 'POST',
            body: schemaText 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson){
                schemaResult.classList.add("isError");
                sschemaText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                schemaResult.classList.add("isResult");
                if(myJson["response"]!=='')
                {
                    sschemaText.innerHTML=myJson["response"];
                }
                else sschemaText.innerHTML="Succes";
            }
        }) 
    }   
    else if(current_focus===queryTextArea)
    {   
        queryText=queryTextArea.value;
        fetch("/databaseFunctionsApi/mainpage/" + $user_id + "/run", {
            method: 'POST',
            body: queryText 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson) 
            {
                queryResult.classList.add("isError");
                qqueryText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                queryResult.classList.add("isResult");
                if(myJson["response"]!=='')
                {
                    qqueryText.innerHTML=myJson["response"];
                }
                else {
                    qqueryText.innerHTML="Succes";
                }
            }
        }) 
    }

    
}

function schemaOnClick(){
    current_focus=schemaTextArea;
}
function queryOnClick(){
    current_focus=queryTextArea;
}

//implement close button