
let $url=window.location.pathname;
$user_id=$url.split("/")[3];

var canvas = document.createElement("div");
canvas.classList.add("toate");


fetch("/databaseFunctionsApi/databases/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    for(var index=0; index<myJson.length; index++)
    {
        var div = document.createElement("div");
        div.classList.add("table");
        if(index==0)
            div.id="buton";
        canvas.appendChild(div);

        var p = document.createElement("p");
        p.classList.add("culoare");
        p.innerHTML=myJson[index]["database_name"];
        div.appendChild(p);

        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("save");
        deleteBtn.innerHTML="Delete";
        div.appendChild(deleteBtn);

        var codeBtn = document.createElement("button");
        codeBtn.classList.add("code");
        codeBtn.innerHTML="Generate code";
        div.appendChild(codeBtn);

    }
    
})

document.body.appendChild(canvas);

//add errors and message if database doesn't exist


  /*
   
echo '<div class="table"'.$var.' >';
echo '<p class="culoare">' .$db[0]. '</p>';
      echo  '<button class="save"> Delete </button>';
      echo  ' <button class="code"> Generate code </button>';
      echo '<button id="generate"> Add </button>';
   

echo'</div>';
$var='';

var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";

document.getElementById("main").appendChild(div);

*/