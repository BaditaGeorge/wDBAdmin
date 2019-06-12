let $url=window.location.pathname;
$user_id=$url.split("/")[3];
let $database_name=$url.split("/")[4];
let table_name=$url.split("/")[5];

let box=document.getElementById("idBox");
var table = document.createElement("table");
box.appendChild(table);
let cvBut=document.getElementById("cvBut");
cvBut.addEventListener("click",selectt);


let c1=document.getElementById("c1");
let c2=document.getElementById("c2");
let c3=document.getElementById("c3");
let c4=document.getElementById("c4");




function selectt()
{
    let sendJson={columns:c1.value, where:c2.value, group:c3.value, having:c4.value};
    fetch("/databaseFunctionsApi/selectData/" + $user_id + "/" + $database_name + "/" + table_name,{
        method: 'PUT',
        header:'Content-type: application/json',
        body: JSON.stringify(sendJson)
    })
.then(function(response) {
    return response.json();
})
.then(function(myJson) {


    for(var index=0; index<myJson.length; index++)
    {
       
        var tr = document.createElement("tr");

        for(var i=0; i<myJson[index].length; i++)
        {
            var td = document.createElement("td");
            td.innerHTML=myJson[index][i]["col"];
            tr.appendChild(td);
        }
        
    table.appendChild(tr);

    }
    
})

}