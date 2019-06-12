let $url=window.location.pathname;
$user_id=$url.split("/")[3];
let $database_name=$url.split("/")[4];
let table_name=$url.split("/")[5];

let box=document.getElementById("idBox");

let cvBut=document.getElementById("cvBut");
cvBut.addEventListener("click", insert);


let c1=document.getElementById("c1");
let c2=document.getElementById("c2");


function insert()
{
    let sendJson={columns:c1.value, values:c2.value};
    fetch("/databaseFunctionsApi/insertData/" + $user_id + "/" + $database_name + "/" + table_name,{
        method: 'PUT',
        header:'Content-type: application/json',
        body: JSON.stringify(sendJson)
    })
.then(function(response) {
    return response.json();
})
.then(function(myJson) {

let p=document.getElementById("result");
p.innerHTML=myJson["response"];
    
})

}