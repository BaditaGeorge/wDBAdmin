<?php

function generateCodeJAVA($data,$usid){
    $cod = 'public class jdbcConn {
        public static void main(String[] args) throws Exception{
           Class.forName("org.apache.derby.jdbc.ClientDriver");
           Connection con = DriverManager.getConnection
           ("jdbc:derby://localhost:80/testDb","name","pass");
           Statement stmt = con.createStatement
           (ResultSet.TYPE_SCROLL_SENSITIVE,
           ResultSet.CONCUR_UPDATABLE);
           con.setAutoCommit(false);
           ResultSet rs = null;
           ';
    $cod = str_replace('testDb',(string)$usid,$cod);
    $cod = str_replace('"name"','"root"',$cod);
    $cod = str_replace('"pass"','""',$cod); 
    $arr=explode("\n",$data);
    $sql = '';
    $nr = 0;
    for($i=0;$i<count($arr);$i++){
        $arr2 = explode(' ',$arr[$i]);
        if(strtolower($arr2[0]) === 'insert' || strtolower($arr2[0]) === 'update' || strtolower($arr2[0]) === 'delete' || strtolower($arr2[0]) === 'create'){
            $sql.=('stmt.addBatch("'.$arr[$i].'");
            ');
            $nr++;
        }
        else{
            if($nr>0){
                $sql.=('stmt.executeBatch();
                con.commit();');
                $nr = 0;
            }
            $sql.=('
            rs = stmt.executeQuery("'.$arr[$i].'");
            rs.last();
            System.out.println("output is "+ rs.getRow());
            ');
        }
    }
    $sql .='}
    }';
    return ($cod.$sql);
}
function generateCodePHP($data,$usid){
     $cod = '$CONFIG = [
        \'servername\' => "localhost",
        \'username\' => "root",
        \'password\' => "",
        \'db\' => $userId
    ];
    ';
    $cod = str_replace('$userId','\''.(string)$usid.'\'',$cod);
    $data=str_replace('\'','"',$data);
    $sql = '$content='.'\''.$data.'\';
    ';
    $cod2 = '$conn = new mysqli($CONFIG["servername"], $CONFIG["username"], $CONFIG["password"], $CONFIG["db"]);

    if ($conn->connect_error) {
      return "conn failed";
    }
    $res=\'\';
    if (mysqli_multi_query($conn, $content)) {
        do {
            /* store first result set */
            if ($result = mysqli_store_result($conn)) {
                //here is where you can process table\'s data
                while ($row = mysqli_fetch_row($result)) {
                    foreach($row as $col)
                    $res=$res.$col.\'   \';
                }
                mysqli_free_result($result);
            }
            /* print divider */
            //we put all data in $res v3ariable
            if (mysqli_more_results($conn)) {
                $res=$res." ; ";
            }
        } while (mysqli_next_result($conn));
    }
    else{
        $res=mysqli_error($conn);
    }
   
    /* close connection */
    mysqli_close($conn);

    //we echo $res, this is just a test, you can modify code as you like
    echo $res';
    return ($cod.$sql.$cod2);
}

class User
{
    public $name;
    
}


?>