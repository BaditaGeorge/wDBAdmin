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

$user_id=$url.split("/")[3];

var canvas = document.createElement("div");
canvas.classList.add("toate");


fetch("/databaseFunctionsApi/databases/" + $user_id)
.then(function(response) {
    return response.json();
})
.then(function(myJson) {

    if(!myJson.length){
        var addBtn=document.createElement("button");
        addBtn.id="noDBS";
        addBtn.innerHTML="Add database";
        addBtn.addEventListener("click",addOnClick);
        var header = document.querySelector("header");
        header.appendChild(addBtn);
    }

    for(var index=0; index<myJson.length; index++)
    {
        var div = document.createElement("div");
        div.classList.add("table");
        if(index==0)
        {
            div.id="buton";
            var addBtn=document.createElement("button");
            addBtn.id="generate";
            addBtn.innerHTML="Add";
            addBtn.addEventListener("click",addOnClick);
            div.appendChild(addBtn);
        }
        canvas.appendChild(div);

        var a= document.createElement("a");
        a.classList.add("culoare");
        a.innerHTML=myJson[index]["database_name"];
        a.href="/bachsql/database/" + $user_id +"/"+myJson[index]["database_name"];
        

        div.appendChild(a);

        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("save");
        deleteBtn.innerHTML="Delete";
        div.appendChild(deleteBtn);
        deleteBtn.dataset.user_id=$user_id;
        deleteBtn.dataset.database_name=myJson[index]["database_name"];
        deleteBtn.addEventListener("click",deleteOnClick);

        var codeBtn = document.createElement("button");
        codeBtn.classList.add("code");
        codeBtn.innerHTML="Generate code";
        div.appendChild(codeBtn);

        

    }
    
})

document.body.appendChild(canvas);

function deleteOnClick(e){

    //maybe add a pop-up: are you sure you want to delete this
    fetch("/databaseFunctionsApi/databases/" + e.target.dataset.user_id + "/" + e.target.dataset.database_name, {
        method: 'DELETE'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();


}

function addOnClick(){

    var form = document.createElement("div");
    form.classList.add("table");
    var divInput= document.createElement("div");
    var input = document.createElement("input");
    input.type="text";
    input.id="inputId";
    divInput.appendChild(input);
    divInput.classList.add("culoare");
    form.appendChild(divInput);
    var createBtn = document.createElement("button");
    createBtn.classList.add("save");
    createBtn.innerHTML="Create database";
    createBtn.dataset.user_id=$user_id;
    //TO DO: check if input is null 
 
    createBtn.addEventListener("click", createOnClick)
    form.appendChild(createBtn);
    canvas.appendChild(form);

    var divButon = document.getElementById("buton");
    var addButon = document.getElementById("generate");
    if(!addButon) 
    {   console.log("null");
        addButon=document.getElementById("noDBS");
     
        divButon=document.querySelector("header");
    }

    divButon.removeChild(addButon);
    
}

function createOnClick(e){

    //TO DO: check if it already exists
  
    var input=document.getElementById("inputId").value;
    console.log(input);
    
  
    fetch("/databaseFunctionsApi/databases/" + e.target.dataset.user_id + "/" + input, {
        method: 'POST'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson["response"]);
    });

    location.reload();

}


