<?php

    function createNewStorage($newUserId){
        //may erase function because we don't need users

        $dsn = "mysql:host=localhost";
        $pdo = new PDO($dsn,"root","");
    
        //Creation of user "user_name"
        $pdo->query("CREATE USER 'usr_name'@'localhost' IDENTIFIED BY 'pass_word';");
  
        
    }

    function createNewDatabase($userId, $databaseName){
        //name of database formed from userId and database name
        
    
        $dsn = "mysql:host=localhost";
        $pdo = new PDO($dsn,"root","");

        $stm=$pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA  WHERE SCHEMA_NAME = '" .$userId."_" . $databaseName. "';" );
        $db=$stm->fetch();
        if($db)
            return 'error: already exists';

        else
        $pdo->query("CREATE DATABASE `".$userId."_" . $databaseName."`;");
        $pdo->query("GRANT ALL PRIVILEGES on `".$userId."_" . $databaseName."`.* TO 'usr_name'@'localhost';");
        
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



?>