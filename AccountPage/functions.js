let addBtn = document.getElementById('Add');
            let menu = document.querySelector('.hidden');
    
            addBtn.addEventListener('click', () => {
                menu.classList.add('is--open');
            });
    
            document.addEventListener('keyup', (e) => {
                if(e.key === 'Escape' || e.keyCode ===27) {
                    menu.classList.remove('is--open');
                }
            })
function AddCol(){
    var tag=document.createElement("a");
    var cntM=document.createElement("div");
    tag.className="btn";
    if(document.getElementById("nmn").value=='')
    {
        alert("Database must have a name!");
        return false;
    }
    cntM.position="relative";
    var t=document.createTextNode(document.getElementById("nmn").value);
    tag.appendChild(t);
    cntM.classList.add("divBx");
    cntM.id=(document.getElementsByClassName("divBx").length).toString();
    cntM.appendChild(tag);
    document.getElementById("idBox").appendChild(cntM);
    document.getElementById("nmn").value='';
}
function removeF(){
    var ell=document.createElement('button');
    ell.innerText="X";
    ell.style.fontSize="15px";
    ell.style.backgroundColor="#ff6666";
    ell.style.color="white";
    ell.style.border="none";
    ell.style.position="absolute";
    ell.style.top="26%";
    ell.style.left="-15%";
    ell.style.borderRadius="50%";
    ell.addEventListener('click',()=>alert('Alerta'));
                /*ell.onclick=function(){
                    alert('MESAJ!');
                    document.getElementById("idBox").removeChild(this.parentNode);
                };*/
    for(var i=0;i<document.getElementsByClassName("divBx").length;i++)
    {
        document.getElementsByClassName("divBx")[i].appendChild(ell.cloneNode(true));
    }        
}