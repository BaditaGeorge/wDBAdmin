<?php

    function createNewStorage($newUserId){
         
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => 'databasefunctions'
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        
        $sql="INSERT INTO `users`(id,database_name,schema_text_area,query_text_area) VALUES(".$newUserId.",".$newUserId.",null,null)";
        if(!mysqli_query($conn, $sql))
            return mysqli_error($conn);

        return "succes";
   
    }

    function createNewDatabase($userId, $databaseName){
        //name of database formed from userId and database name
        
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => ''
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        
        $sql="SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA  WHERE SCHEMA_NAME = '" .$userId."_" . $databaseName. "'";

        $result = mysqli_query($conn, $sql);
        if(!$result)
            return mysqli_error($conn);
        
        if (mysqli_num_rows($result) > 0)
           return 'error: already exists';
        
    
        $result=mysqli_query($conn,"CREATE DATABASE `".$userId."_" . $databaseName."`;");

        if(!$result)
            return mysqli_error($conn);

        mysqli_close($link);

         
        $CONFI = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => 'databasefunctions'
        ];

        $conn = new mysqli($CONFI["servername"], $CONFI["username"], $CONFI["password"], $CONFI["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 

        $result=mysqli_query($conn,"INSERT INTO users(id,database_name,schema_text_area,query_text_area) VALUES('".$userId."','".$userId . "_" . $databaseName."',null,null)");

        if(!$result)
            return mysqli_error($conn);
        
        return 'created';

    }

    function getAllDatabases($userId){
        $dsn = "mysql:host=localhost";
        $pdo = new PDO($dsn,"root","");
        $stm=$pdo->query("SELECT SUBSTR(SCHEMA_NAME,LENGTH($userId)+2) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE '" .$userId."_%';" );
        $databases=[];
        
        while($db=$stm->fetch())
        {   
            array_push($databases,$db);
        }

        return $databases;
        //each object in the array is another array; acces with db[0]
        //TO DO: change query to be non-injective if possible; use mysqli

    }

    function deleteDatabase($userId, $databaseName)
    {   
       	
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => ''
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        
        $sql="DROP DATABASE " . $userId .'_'. $databaseName;
        if(!mysqli_query($conn, $sql))
             return mysqli_error($conn);
        


        return "succes";



    }

    function getMainPageContent($databaseName){
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => 'databasefunctions'
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          $newError=["error" => "conn failed"];
          return $newError;
        } 
     
        $sql="SELECT * FROM `users` WHERE `database_name`='".$databaseName."'";
        $result=mysqli_query($conn, $sql);
        if(!$result)
            return mysqli_error($conn);
        
        return mysqli_fetch_assoc($result);

    }

    function run($userId, $content){
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        $res='';
        if (mysqli_multi_query($conn, $content)) {
            do {
                /* store first result set */
                if ($result = mysqli_store_result($conn)) {
                    while ($row = mysqli_fetch_row($result)) {
                        foreach($row as $col)
                        $res=$res.$col.'   ';
                    }
                    mysqli_free_result($result);
                }
                /* print divider */
                if (mysqli_more_results($conn)) {
                    $res=$res."<br>-----------------<br>";
                }
            } while (mysqli_next_result($conn));

            $newObj=["response" => $res];
        }
        else{
            $res2=mysqli_error($conn);
            $newObj=["error" => $res2];
        }
        
        /* close connection */
        mysqli_close($conn);

        return $newObj;
    }

    function getFunction($userId, $nameDB){
        $CONFIG=[
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db'=>$userId .'_'. $nameDB
        ];

        //conn to DB
        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
        

        //checkConection
        if ($conn->connect_error) {
          return "conn failed";
        }

        $dsn = "mysql:host=localhost";
        $pdo = new PDO($dsn,"root","");
        // $stm=$pdo->query("SELECT SUBSTR(SCHEMA_NAME,LENGTH($userId)+2) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE '" .$userId."_%';" );
        //mai ia query de pe net + schimba nr variabile, nu fi cici.(motivation)
        $stm=$pdo->query("
        SELECT routine_definition, routine_name FROM information_schema.routines
            WHERE routine_type LIKE 'function'
        ");

        $functions=[];
          
        while($functionsArray=$stm->fetch())
        {  
            
            $new_obj=["function_name"=>$functionsArray[1],"function_body"=>$functionsArray[0]];
            array_push($functions,$new_obj);
        }
  
        return json_encode($functions);
    }

    function saveSchemasAndQueries($userId, $nameDB, $schema, $query){

        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => 'databasefunctions'
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        if($userId===$nameDB)
        $databaseName=$userId;
        else
        $databaseName=$userId . '_' . $nameDB;

        $sql="UPDATE `users` SET `schema_text_area`='".$schema."', query_text_area='".$query."' WHERE database_name='".$databaseName."'";
        if(!mysqli_query($conn, $sql))
            return mysqli_error($conn);

        return "Saved";
        



    }

    function getTables($userId, $databaseName)
    {
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => 'databasefunctions'
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
       
        $databaseName=$userId.'_'.$databaseName;
        $sql="SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='".$databaseName."'";
        $result=mysqli_query($conn, $sql);
        
        if(!$result)
            return mysqli_error($conn);
       
        $tables=[];
        while($row=mysqli_fetch_array($result)){
            $table=["table_name" => $row[0]];
            array_push($tables,$table);
        }

        return $tables;

    }

    function getProcedures($userId, $nameDB){
        $CONFIG=[
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db'=>$userId .'_'. $nameDB
        ];

        //conn to DB
        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
        

        //checkConection
        if ($conn->connect_error) {
          return "conn failed";
        }

        $sql=" SELECT routine_definition, routine_name FROM information_schema.routines  WHERE routine_type LIKE 'procedure'";
        $result=mysqli_query($conn, $sql);
        
        if(!$result)
            return mysqli_error($conn);
       
        $procedures=[];
        while($row=mysqli_fetch_array($result)){
            $procedure=["procedure_name" => $row[1],"procedure_definition" => $row[0]];
            array_push($procedures,$procedure);
        }

        return json_encode($procedures);


    }

    function createTable($userId, $nameDB, $tableDetails){
        $CONFIG=[
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db'=>$userId .'_'. $nameDB
        ];

        //conn to DB
        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
        
        //checkConection
        if ($conn->connect_error) {
          return "conn failed";
        }

        $sql="CREATE TABLE ". $tableDetails["tableName"]. "(";
        for($i=0; $i<$tableDetails["numberColumns"]; $i++)
        {
            $sql=$sql .$tableDetails["columnDescription"][$i]["name"];
            $sql=$sql .' '.$tableDetails["columnDescription"][$i]["type"];
            if($tableDetails["columnDescription"][$i]["length"])
            $sql=$sql .'('.$tableDetails["columnDescription"][$i]["length"].')';
            if(!$tableDetails["columnDescription"][$i]["null"])
            $sql=$sql .' NOT NULL';
            
            if($i<$tableDetails["numberColumns"]-1)
            $sql=$sql .',';
            else
            $sql=$sql .')';

        }

        $result=mysqli_query($conn, $sql);
        
        if(!$result)
            return mysqli_error($conn);
        else 
            return "Succes";


    }

    
    function createFunction($userId, $nameDB, $functionDetails){

        $CONFIG=[
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db'=>$userId .'_'. $nameDB
        ];

        
        //conn to DB
        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
        
        //checkConection
        if ($conn->connect_error) {
          return "conn failed";
        }
        
       

        $sql="CREATE OR REPLACE FUNCTION ". $functionDetails["functionName"]. "(";
        
        for($i=0; $i<$functionDetails["numberOfParameters"]; $i++)
        {   
           
            $sql=$sql .$functionDetails["parametersDescription"][$i]["name"];
            $sql=$sql .' '.$functionDetails["parametersDescription"][$i]["type"];
            
            if($i<$functionDetails["numberOfParameters"]-1)
            $sql=$sql .',';
            else
            $sql=$sql .') ';

        }
      

        $sql=$sql . 'RETURNS ' . $functionDetails["returnType"] . ' '. str_replace("\r\n"," ",$functionDetails["bodyText"]);
        $sql=$sql . ";";

      

        $result=mysqli_query($conn, $sql);
        
        if(!$result)
            return mysqli_error($conn);
        else 
            return "Succes";


    }

    function deleteTable($userId, $nameDB,$obj)
    {
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId . '_' . $nameDB
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return "conn failed";
        } 
        

        $sql="DROP TABLE ".$obj['table_name'];
        if(!mysqli_query($conn, $sql))
            return mysqli_error($conn);

        return "Succes";
        

    }

    function getStructure($userId,$database_name,$table_name)
    {
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId . '_' . $database_name
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return json_encode(["response" =>"conn failed"]);
        } 
        

        $sql="select column_name, data_type, character_maximum_length, is_nullable from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='" .$table_name. "' AND TABLE_SCHEMA='" . $userId . "_" . $database_name ."'";
        $result=mysqli_query($conn, $sql);
        if(!$result)
            return json_encode(["response" =>mysqli_error($conn)]);

        $columns=[]; 
        while($row=mysqli_fetch_array($result)){
            $structure=["name" => $row[0],"type" => $row[1], "length" => $row[2], "null" =>$row[3]];
            array_push($columns,$structure);
        }
    
        return json_encode($columns);
    

        
        

    }

    function selectData($userId,$database_name,$table_name,$select)
    {
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId . '_' . $database_name
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return json_encode(["response" =>"conn failed"]);
        } 
        

        $sql="select ".$select["columns"]  ." from ".$table_name;
        if($select["where"])
        $sql=$sql." WHERE ".$select["where"];
        if($select["group"])
        $sql=$sql." GROUP BY ".$select["group"];
        if($select["having"])
        $sql=$sql." HAVING ".$select["having"];

        

        $result=mysqli_query($conn, $sql);
        if(!$result)
            return json_encode(["response" =>mysqli_error($conn)]);

        $rows=[]; 
        while($row=mysqli_fetch_row($result)){
            $roww=[];
            foreach($row as $col)
            {
               $column=["col" => $col];
               array_push($roww,$column);
            }
            array_push($rows,$roww);

        }
    
        return json_encode($rows);

    }

    function insertData($userId,$database_name,$table_name,$insert){

        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId . '_' . $database_name
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return json_encode(["response" =>"conn failed"]);
        } 

    

        $sql="INSERT INTO " . $table_name . "(".$insert["columns"] .") VALUES(" . $insert["values"] .")";
        

        $result=mysqli_query($conn, $sql);
        if(!$result)
            return json_encode(["response" =>mysqli_error($conn)]);

       
    
        return json_encode(["response" =>"Succes"]);
    }


    function deleteColumn($userId,$database_name,$table_name,$column){
        $CONFIG = [
            'servername' => "localhost",
            'username' => "root",
            'password' => '',
            'db' => $userId . '_' . $database_name
        ];

        $conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);
 
        if ($conn->connect_error) {
          return json_encode(["response" =>"conn failed"]);
        } 

    

        $sql="ALTER TABLE " . $table_name . " DROP COLUMN ".$column["name"];
        

        $result=mysqli_query($conn, $sql);
        if(!$result)
            return json_encode(["response" =>mysqli_error($conn)]);

       
    
        return json_encode(["response" =>"Succes"]);

    }


?>