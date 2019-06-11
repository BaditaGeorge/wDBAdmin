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
    divCreateTable.classList.remove("columnsOfTable-hidden");
   
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