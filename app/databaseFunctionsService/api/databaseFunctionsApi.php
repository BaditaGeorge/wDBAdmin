<?php
include_once('../models/databaseFunctionsModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];

if($method=='POST'){

    preg_match('/^\/databaseFunctionsApi\/newId\/(.+)$/', $endpoint, $matches);
    
   
    if($matches)
    {   
        $response=["response" => createNewStorage($matches[1])];
        header('Content-type: application/json');
        echo json_encode($response);
    }
    else
    {
        preg_match('/^\/databaseFunctionsApi\/databases\/(.+)\/(.+)$/', $endpoint, $matches);
        if($matches){
            $response=["response" =>  createNewDatabase($matches[1],$matches[2])];
            header('Content-type: application/json');
            echo json_encode($response);

        }
        else{

            preg_match('/^\/databaseFunctionsApi\/mainpage\/(.+)\/run$/', $endpoint, $matches);
            if($matches){
              
                $response=run($matches[1],file_get_contents('php://input'));
                header('Content-type: application/json');
                echo json_encode($response);
            }


            else{

                preg_match('/^\/databaseFunctionsApi\/createTable\/(.+)\/(.+)$/', $endpoint, $matches);
                if($matches){
                
                    $response=["response" => createTable($matches[1],$matches[2],json_decode(file_get_contents('php://input'),true))];
                    header('Content-type: application/json');
                    echo json_encode($response);
                }

                
                else
                {
                    header('Content-type: application/json');
                    echo json_encode(['reason'=>'Bad request']);
                    http_response_code(400);
                }


        }


        }

    

        
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
    else{

        preg_match('/^\/databaseFunctionsApi\/mainpage\/(.+)$/', $endpoint, $matches);

        if($matches){
            $result=getMainPageContent($matches[1]);
    
                header('Content-type: application/json');
                echo json_encode($result);

        }
        else{
            preg_match('/^\/databaseFunctionsApi\/functions\/(.+)\/(.+)$/', $endpoint, $matches);
    
            if($matches){
                $response=getFunction($matches[1],$matches[2]);
                header('Content-type: application/json');
                echo $response;
            }
            else{

                preg_match('/^\/databaseFunctionsApi\/tables\/(.+)\/(.+)$/', $endpoint, $matches);
    
                if($matches){
                    $response=getTables($matches[1],$matches[2]);
                    header('Content-type: application/json');
                    echo json_encode($response);
                }

                else{
                    preg_match('/^\/databaseFunctionsApi\/procedures\/(.+)\/(.+)$/', $endpoint, $matches);
                  
                    if($matches){
                        $response=getProcedures($matches[1],$matches[2]);
                        header('Content-type: application/json');
                        echo $response;
                    }

                    else{
                        header('Content-type: application/json');
                        echo json_encode(['reason'=>'Bad request']);
                        http_response_code(400);
                    }

                }
    
            }
        }

    }

}

else if($method=='DELETE'){

    preg_match('/^\/databaseFunctionsApi\/databases\/(.+)\/(.+)$/', $endpoint, $matches);
    if($matches)
    {
        $response=["response" => deleteDatabase($matches[1],$matches[2])];
        header('Content-type: application/json');
        echo json_encode($response);
    }
    else{
        header('Content-type: application/json');
        echo json_encode(['reason'=>'Bad request']);
        http_response_code(400);
    }
}

else if($method=='PUT'){

     preg_match('/^\/databaseFunctionsApi\/mainpage\/save\/(.+)\/(.+)$/', $endpoint, $matches);
     
     if($matches){
        $myJson=json_decode(file_get_contents('php://input'),true);

        $response=["response" => saveSchemasAndQueries($matches[1],$matches[2],$myJson["schema"],$myJson["query"])];
        header('Content-type: application/json');
        echo json_encode($response);
     }
     else{
        header('Content-type: application/json');
        echo json_encode(['reason'=>'Bad request']);
        http_response_code(400);
    }


}






?>