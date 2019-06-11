let $url=window.location.pathname;
let $user_id=$url.split("/")[3];
let $database_name=$url.split("/")[4];
let table_name=$url.split("/")[5];
let number_of_columns=$url.split("/")[6];

let box=document.getElementById("idBox");
for(let i=0; i<number_of_columns; i++)
{
    var div=document.createElement("div");
    var columnName=document.createElement("input");
    columnName.type="text";
    columnName.id="columnName"+i;
    columnName.classList.add("name");
    columnName.placeholder="Name of Column";
    div.appendChild(columnName);

    var labelType=document.createElement("label");
    labelType.innerHTML="Type";
    labelType.classList.add("labelType");



    var columnType=document.createElement("select");
    columnType.classList.add("options");
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
    labelType.appendChild(columnType);
    div.appendChild(labelType);

    var labelSize=document.createElement("label");
    labelSize.innerHTML="Size";

    var length=document.createElement("input");
    length.type="number";
    length.id="length"+i;
    labelSize.appendChild(length);
    div.appendChild(labelSize);
    labelSize.classList.add("size");
    length.classList.add("sizes");

    var labelNull=document.createElement("label");
    labelNull.innerHTML="Null";
    var isNull=document.createElement("input");
    isNull.type="checkbox";
    isNull.id="isNull"+i;
    labelNull.appendChild(isNull);
    div.appendChild(labelNull);
    box.appendChild(div);
    labelNull.classList.add("null");
    isNull.classList.add("nulls");
}


let createTableBtn=document.getElementById("createTable");
createTableBtn.addEventListener("click", createTableOnClick);


function createTableOnClick(){
    let columns=[];
    
    for(var i=0; i<number_of_columns; i++){
       
        let columnName=document.getElementById("columnName"+i).value;
        let columnType=document.getElementById("columnType"+i).value;
        let columnTypeLength=document.getElementById("length"+i).value;
        let columnIsNull=document.getElementById("isNull"+i).checked;
       
        let column={name:columnName,type:columnType,length:columnTypeLength,null:columnIsNull};
        columns.push(column);
    }
    
    
    let tableDetails={tableName:table_name,numberColumns:number_of_columns, columnDescription:columns};
    
    
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
            window.location.pathname="m.bachsql/tables/"+$user_id+'/'+$database_name;
        }
        else {
         console.log(myJson["response"]);
        }        
    })
    
    }