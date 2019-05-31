<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" type="text/css" href="../css/desktopDatabases.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    
    
    <?php
        //Add forms to make buttons functional
        include_once("../../databaseFunctionsService/models/databaseFunctionsModel.php");
        echo '<style>';
        include '../css/desktopDatabases.css';
        echo '</style>';   
        
        echo '<header>  <input type="image" src="../css/avatarIcon.png" id="buttonImg" alt="buttonImg"> </header>';

       
        $endpoint=$_SERVER['REQUEST_URI'];
        preg_match('/^\/bachsql\/databases\/(.+)$/', $endpoint, $matches);
        if($matches)
        {   
            echo '<div class="toate" id="idToate">';
           
            $var='id="buton"';
            $dbs=getAllDatabases($matches[1]);
            foreach($dbs as $db){
               
                echo '<div class="table"'.$var.' >';
                echo '<p class="culoare">' .$db[0]. '</p>';
                      echo  '<button class="save"> Delete </button>';
                      echo  ' <button class="code"> Generate code </button>';
                      echo '<button id="generate"> Add </button>';
                   
        
              echo'</div>';
              $var='';
            }
            echo'</div>';

            
        }
        

    ?>
    <!--
   Check if js is useful
            <button onclick="AddEl();return false;" id="generate"> Add </button>
        
    <script src="../js/some.js">
    </script>
    -->
</body>

</html>