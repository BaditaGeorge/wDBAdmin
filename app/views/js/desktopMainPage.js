
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
let schemaSaving=document.getElementById("schema_database");
let querySaving=document.getElementById("query_database");
let saveSchemaBtn=document.getElementById("saveSchema");
let saveQueryBtn=document.getElementById("saveQuery");

databasesLink.setAttribute("href", "/bachsql/databases/" + $user_id);


//check if cookie expired if it didn't get the text-areas

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


let runButton=document.getElementById("runBtn");
runButton.addEventListener("click",runOnClick);

function runOnClick(){

    let databaseName=selectDatabase.value;
    let url="/databaseFunctionsApi/mainpage/" + $user_id +"_"+databaseName+ "/run";
   
    url="/databaseFunctionsApi/mainpage/" + $user_id +"/run";
    
    if(current_focus===schemaTextArea)
    {
        schemaText=schemaTextArea.value;
    
        fetch(url, {
            method: 'POST',
            body: schemaText 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson){
                if ( schemaResult.classList.contains("isResult"))
                    schemaResult.classList.remove("isResult");

                schemaResult.classList.add("isError");
                sschemaText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                if ( schemaResult.classList.contains("isError"))
                    schemaResult.classList.remove("isError");

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
        
        fetch(url, {
            method: 'POST',
            body: queryText 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if('error' in myJson) 
            {   
                if ( schemaResult.classList.contains("isResult"))
                    schemaResult.classList.remove("isResult");
                queryResult.classList.add("isError");
                qqueryText.innerHTML=myJson["error"];
            }
            else if('response' in myJson){
                if ( schemaResult.classList.contains("isError"))
                    schemaResult.classList.remove("isError");

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


let saveButton=document.getElementById("saveBtn");
saveButton.addEventListener("click", saveOnClick);

function saveOnClick(){

    let sendJson={schema:schemaTextArea.value, query:queryTextArea.value};
 
    let databaseName;
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
        if ( schemaResult.classList.contains("isError"))
                    schemaResult.classList.remove("isError");

         schemaResult.classList.add("isResult");
         sschemaText.innerHTML=myJson["response"];

         if ( queryResult.classList.contains("isError"))
         queryResult.classList.remove("isError");

         queryResult.classList.add("isResult");
         qqueryText.innerHTML=myJson["response"];
                
    })


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


function createDatabaseRedirect()
{
    if(selectDatabase.value==="Create new database")
    window.location.href="/bachsql/databases/" + $user_id;
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

