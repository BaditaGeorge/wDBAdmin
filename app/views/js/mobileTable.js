let $url=window.location.pathname;
$user_id=$url.split("/")[3];
let $database_name=$url.split("/")[4];
let table_name=$url.split("/")[5];




let structureLink=document.getElementById("structureLink");
structureLink.href="m.bachsql/structure/" + $user_id + "/" + $database_name + "/" + table_name;
let selectDataLink=document.getElementById("selectDataLink");
selectDataLink.href="m.bachsql/selectdata/" + $user_id + "/" + $database_name + "/" + table_name;
let insertDataLink=document.getElementById("insertDataLink");
insertDataLink.href="m.bachsql/insertdata/" + $user_id + "/" + $database_name + "/" + table_name;
let alterTableLink=document.getElementById("alterTableLink");
alterTableLink.href="m.bachsql/altertable/" + $user_id + "/" + $database_name + "/" + table_name;
let newItemLink=document.getElementById("newItemLink");
newItemLink.href="m.bachsql/newitem/" + $user_id + "/" + $database_name + "/" + table_name;

let title=document.getElementById("title");
title.innerHTML=table_name;


