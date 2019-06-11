let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];
$database_name=$url.split("/")[4];

let divTables = document.getElementById("tabele");
let divFunctions = document.getElementById("buton");
let divProcedures = document.getElementById("prceds");
let addTableBtn=document.getElementById("addTable");
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

addTableBtn.addEventListener("click", addTableOnClick);

function addTableOnClick()
{   
    let divCreateTable=document.getElementById("columnsOfTable");
    divCreateTable.classList.remove("hidden");
   
    let tableName = document.getElementById("nameTable").value;
    let numberOfColumns=document.getElementById("numberColumns").value;


    let tableTitle=document.getElementById("tableTitle");
    tableTitle.innerHTML="Choose columns for " + tableName; 

    for(var i=0; i<numberOfColumns; i++)
    {
        var newRow = document.createElement("tr");
        var column1= document.createElement("td");
        var column2= document.createElement("td");
        var column3= document.createElement("td");
        var column4= document.createElement("td");
        
        var columnName=document.createElement("input");
        columnName.type="text";
        columnName.id="columnName"+i;
        column1.appendChild(columnName);

        var columnType=document.createElement("select");
        var option1=document.createElement("option");
        option1.innerHTML="INT";
        option1.value="INT";
        var option2=document.createElement("option");
        option2.innerHTML="VARCHAR";
        option1.value="VARCHAR";
        var option3=document.createElement("option");
        option3.innerHTML="TEXT";
        option3.value="TEXT";
        var option4=document.createElement("option");
        option4.innerHTML="DATE";
        option4.value="DATE";

        columnType.appendChild(option1);
        columnType.appendChild(option2);
        columnType.appendChild(option3);
        columnType.appendChild(option4);
        columnType.id="columnType"+i;
        column2.appendChild(columnType);

        var length=document.createElement("input");
        length.type="number";
        length.id="length"+i;
        column3.appendChild(length);

        var isNull=document.createElement("input");
        isNull.type="checkbox";
        isNull.id="isNull"+i;
        column4.appendChild(isNull);

        newRow.appendChild(column1);
        newRow.appendChild(column2);
        newRow.appendChild(column3);
        newRow.appendChild(column4);

        let tabl=document.getElementById("tableToCreateTable");
        tabl.appendChild(newRow);
   
    }

    let createTableBtn=document.getElementById("createTable");
    createTableBtn.dataset.columnNumber=numberOfColumns;
    createTableBtn.dataset.tableName=tableName;
    createTableBtn.addEventListener("click", createTableOnClick);


}

function createTableOnClick(e){
let columns=[];

for(var i=0; i<e.target.dataset.columnNumber; i++){
   
    let columnName=document.getElementById("columnName"+i).value;
    let columnType=document.getElementById("columnType"+i).value;
    let columnTypeLength=document.getElementById("length"+i).value;
    let columnIsNull=document.getElementById("isNull"+i).checked;
   
    let column={name:columnName,type:columnType,length:columnTypeLength,null:columnIsNull};
    columns.push(column);
}


let tableDetails={tableName:e.target.dataset.tableName,numberColumns:e.target.dataset.columnNumber, columnDescription:columns};


fetch("/databaseFunctionsApi/createTable/" + $user_id +"/"+$database_name, {
    method:"POST",
    headers:{"Content-type": "application/json"},
    body:JSON.stringify(tableDetails)
})
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    if(myJson["response"]==="Succes")
    {
        location.reload();
    }
    else 
    console.log(myJson["response"]);
    
})

}

let addFunctionBtn=document.getElementById("buttonAddFunctions");
addFunctionBtn.addEventListener("click", popUpAddFunction);
let createFunctionDiv=document.getElementById("createFunctionDiv");

let functionDiv=document.getElementById("addFunctionDiv");

function popUpAddFunction()
{
    functionDiv.classList.remove("hidden");
    let moreOptions=document.getElementById("showMoreOptionsFunction");
    moreOptions.addEventListener("click", moreOptionsFunction);

}
function moreOptionsFunction()
{
    functionDiv.classList.add("hidden");
   
    createFunctionDiv.classList.remove("hidden");

    let functionName=document.getElementById("functionName").value;
    let numberOfParameters=document.getElementById("numberOfParameters").value;
    let returnType=document.getElementById("returnType").value;

    for(var i=0; i<numberOfParameters; i++){
        var newRow = document.createElement("tr");
        var column1= document.createElement("td");
        var column2= document.createElement("td");

        var parameterName=document.createElement("input");
        parameterName.type="text";
        parameterName.id="parameterName"+i;
        column1.appendChild(parameterName);

        var parameterType=document.createElement("select");
        parameterType.value="INT";
        var option1=document.createElement("option");
        option1.innerHTML="INT";
        option1.value="INT";
        var option2=document.createElement("option");
        option2.innerHTML="VARCHAR";
        option2.value="VARCHAR";
        var option3=document.createElement("option");
        option3.innerHTML="TEXT";
        option3.value="TEXT";
        var option4=document.createElement("option");
        option4.innerHTML="DATE";
        option4.value="DATE";

        parameterType.appendChild(option1);
        parameterType.appendChild(option2);
        parameterType.appendChild(option3);
        parameterType.appendChild(option4);
        parameterType.id="parameterType"+i;
        column2.appendChild(parameterType);
        
        newRow.appendChild(column1);
        newRow.appendChild(column2);

        let tabl=document.getElementById("tableToCreateFunction");
        tabl.appendChild(newRow);
        
    }

    let bodyText=document.getElementById("bodyText");
    bodyText.value="BEGIN\r\nEND";
    let btnCreateFunction=document.getElementById("btnCreateFunction");
    btnCreateFunction.dataset.functionName=functionName;
    btnCreateFunction.dataset.numberOfParameters=numberOfParameters;
    btnCreateFunction.dataset.returnType=returnType;
    btnCreateFunction.addEventListener("click", createFunctionOnClick);

}

function createFunctionOnClick(e)
{
    let parameters=[];

for(var i=0; i<e.target.dataset.numberOfParameters; i++){
   
    let parameterName=document.getElementById("parameterName"+i).value;
    let parameterType=document.getElementById("parameterType"+i).value;
   
    let parameter={name:parameterName,type:parameterType};
    parameters.push(parameter);
}

let functionBody=document.getElementById("bodyText").value;

let functionDetails={functionName:e.target.dataset.functionName,numberOfParameters:e.target.dataset.numberOfParameters,returnType:e.target.dataset.returnType, bodyText:functionBody, parametersDescription:parameters};

console.log(functionDetails);

fetch("/databaseFunctionsApi/createFunction/" + $user_id +"/"+$database_name, {
    method:"POST",
    headers:{"Content-type": "application/json"},
    body:JSON.stringify(functionDetails)
})
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    console.log(":(");
    if(myJson["response"]==="Succes")
    {
        location.reload();
    }
    else 
    console.log(myJson["response"]);
    
})


}

