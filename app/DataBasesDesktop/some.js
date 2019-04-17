function AddEl()
{
    var el=document.createElement("div");
    var el2=document.createElement("p");
    var el3=document.createElement("button");
    var el4=document.createElement("button");
    el.classList.add("table");
    el2.classList.add("culoare");
    el3.id="save";
    el4.id="code";
    el3.style.marginRight="5px";
    el2.innerText="DataBase0";
    el3.innerText="Delete";
    el3.onclick=Delu;
    el4.innerText="Generate Code";
    el.appendChild(el2);
    el.appendChild(el3);
    el.appendChild(el4);
    var cont=document.getElementById("idToate");
    cont.insertBefore(el,cont.firstChild);
}
function Delu()
{
    document.getElementById("idToate").removeChild(this.parentNode);
}