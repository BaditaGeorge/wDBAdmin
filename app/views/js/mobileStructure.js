let $url=window.location.pathname;
$user_id=$url.split("/")[3];
let $database_name=$url.split("/")[4];
let table_name=$url.split("/")[5];

let box=document.getElementById("idBox");

fetch("/databaseFunctionsApi/structure/" + $user_id + "/" + $database_name + "/" + table_name)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {


    for(var index=0; index<myJson.length; index++)
    {
        var table = document.createElement("table");
        var tr1=document.createElement("tr");
        var tr2=document.createElement("tr");
        var tr3=document.createElement("tr");
        var tr4=document.createElement("tr");
        
        var td11=document.createElement("td");
        var td12=document.createElement("td");
        var td21=document.createElement("td");
        var td22=document.createElement("td");
        var td31=document.createElement("td");
        var td32=document.createElement("td");
        var td41=document.createElement("td");
        var td42=document.createElement("td");

        td12.innerHTML=myJson[index]["name"];
        td22.innerHTML=myJson[index]["type"];
        td32.innerHTML=myJson[index]["length"];
        td42.innerHTML=myJson[index]["null"];

        td11.innerHTML="Column name";
        td21.innerHTML="Column type";
        td31.innerHTML="Maximum length";
        td41.innerHTML="Can be null";

        tr1.appendChild(td11);
        tr1.appendChild(td12);
        tr2.appendChild(td21);
        tr2.appendChild(td22);
        tr3.appendChild(td31);
        tr3.appendChild(td32);
        tr4.appendChild(td41);
        tr4.appendChild(td42);

        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);

        box.appendChild(table);

        var btn=document.createElement("button");
        btn.classList.add("small-btn");
        btn.innerHTML="Delete column";
        btn.dataset.cname=myJson[index]["name"];
        btn.addEventListener("click", deleteC);
        box.appendChild(btn);

        box.appendChild(document.createElement("br"));



    }
    
})

function deleteC(e)
{
    let sendJson={name:e.target.dataset.cname};
    fetch("/databaseFunctionsApi/column/" + $user_id + "/" + $database_name + "/" + table_name,{
        method: 'DELETE',
        header:'Content-type: application/json',
        body: JSON.stringify(sendJson)
    })
.then(function(response) {
    return response.json();
})
.then(function(myJson) {

    console.log(myJson["response"]);
    
    
})
}
