<?php
include_once('../models/databaseFunctionsModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];

if($method=='POST'){

    preg_match('/^\/databaseFunctionsApi\/newId\/(.+)$/', $endpoint, $matches);
    
   
    if($matches)
    {   
        //createNewStorage($matches[1]);
     
    }
    else
    {
        header('Content-type: application/json');
        echo json_encode(['reason'=>'Bad request']);
        http_response_code(400);
    }
    
}

else if($method=='GET'){

    preg_match('/^\/databaseFunctionsApi\/databases\/(.+)$/', $endpoint, $matches);

    //check if user exists if needed

    if($matches)
    {   
        $databases=[];
        $dbs=getAllDatabases($matches[1]);
        foreach($dbs as $db){
            $new_obj=["database_name"=>$db[0]];
            array_push($databases,$new_obj);
        }
        header('Content-type: application/json');
           echo json_encode($databases);
    }

}





?>