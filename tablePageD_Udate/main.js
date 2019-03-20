function mkV1(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idStr").style.display="block";
}
function mkV2(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idIndx").style.display="block";
}
function mkV3(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idTriggers").style.display="block";
}
function mkV4(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idFrgK").style.display="block";
}
function mkV5(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idViews").style.display="block";
}
function mkV6(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idSelDat").style.display="block";
}
function mkV7(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idInsData").style.display="block";
}
function mkV8(){
    document.getElementsByClassName("allPhotos")[0].style.opacity="0.5";
    document.getElementById("idAddN").style.display="block";
}
for(var i=0;i<document.getElementsByClassName("buttonClose").length;i++)
{
    document.getElementsByClassName("buttonClose")[i].onclick=function(){
        this.parentNode.style.display="none";
        document.getElementsByClassName("allPhotos")[0].style.opacity="1";
    };
}