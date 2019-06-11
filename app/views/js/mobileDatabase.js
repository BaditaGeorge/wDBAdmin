
let current_focus=0;
let $url=window.location.pathname;
$user_id=$url.split("/")[3];
$database_name=$url.split("/")[4];

let dbTitle=document.getElementById("databaseTitle");
dbTitle.innerHTML=$database_name;
let mainPageLink=document.getElementById("mainPageLink");
mainPageLink.href="m.bachsql/mainpage/" + $user_id;

let tablesLink=document.getElementById("tablesLink");
tablesLink.href="m.bachsql/tables/" + $user_id + '/'+ $database_name;
