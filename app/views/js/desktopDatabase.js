let $url=window.location.pathname;

function mobilecheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  if(mobilecheck())
  {
    window.location.href='m.'+ $url.substring(1);
  }


let current_focus=0;

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

