<?php
    $data = '';
    if($_SERVER['REQUEST_URI'] === '/apiDet.php' && $_SERVER['REQUEST_METHOD'] === 'POST'){
        $cr = file_get_contents('php://input');
        $data = file_get_contents('dat.txt');
        $arr = explode('","b',$cr);
        $arr2 = explode('":"',$arr[0]);
        $arr3 = str_replace(':','',$arr[1]);
        $arr3 = str_replace('"','',$arr3);
        $arr3 = str_replace('}','',$arr3);
        if($arr2[1] === 'backspace')
            $data = substr($data,0,-1);
        else{
            if($arr2[1] === '\r'){
                if(intval($arr3)<strlen($data))
                    $data = substr_replace($data,"\n",$arr3,0);
                else
                    $data .= "\n";
            }
            else{
                if(intval($arr3)<=strlen($data))
                    $data = substr_replace($data,$arr2[1],$arr3,0);
                else
                    $data .= $arr2[1];
            }
        }
        file_put_contents('dat.txt',$data);
        echo 'vafa';
        //echo $data;
    }
    if($_SERVER['REQUEST_URI'] === '/apiDet.php' && $_SERVER['REQUEST_METHOD'] === 'GET'){
        $data = file_get_contents('dat.txt');
        //$data = str_replace('\r',"\n",$data);
        echo $data;
    }
    //kikimashina12
    //georgeDbATw
?>