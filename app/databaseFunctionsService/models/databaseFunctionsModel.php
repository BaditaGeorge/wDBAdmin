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
        
        $sql="INSERT INTO `users`(id,main_page,schema_text_area,query_text_area) VALUES(".$newUserId.",0,null,null)";
        if(!mysqli_query($conn, $sql))
            return mysqli_error($conn);

        return "succes";
   
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

    function getMainPageContent($userId){
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
     
        $stm = $conn -> prepare("SELECT * FROM users WHERE id= ?");
        $stm -> bind_param("s", $userId);
        $stm -> execute();
        
        $result = $stm-> get_result();
    
        foreach($result as $row) {
            return $row;
        }

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

?>