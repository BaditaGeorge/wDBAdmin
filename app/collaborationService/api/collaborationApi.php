<?php
//include_once('../models/accountModel.php');
include_once('../models/User.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];

if($method === 'POST'){
    $data = '';
    $arr = json_decode(file_get_contents('php://input'),true);
    $v1 = $arr['a'];
    $v2 = $arr['b'];
    $v3 = $arr['c'];
    if($v3 === 'baza')
        $data = file_get_contents('baza.txt');
    else
        $data = file_get_contents('baza2.txt');
    if($v1 === 'backspace'){
        $data = substr($data,0,-1);
    }else{
        if($v1 === '\r'){
            if(intval($v2)<strlen($data))
                $data = substr_replace($data,"\n",$v2,0);
            else
                $data .= "\n";
        }
        else{
            if(intval($v2)<=strlen($data))
                $data = substr_replace($data,$v1,$v2,0);
            else
                $data .= $v1;
        }
    }
    if($v3 === 'baza')
        file_put_contents('baza.txt',$data);
    else
        file_put_contents('baza2.txt',$data);
}
// if($method=='PUT'){

//     if($endpoint==='collaborationApi/newColab')
//     {
//         $requestBodyAsString = json_decode(file_get_contents('php://input'),TRUE);
//         $partners=$requestBodyAsString['partners'];
        

//     }
//     else
//     {
//         header('Content-type: application/json');
//         echo json_encode(['reason'=>'Bad request']);
//         http_response_code(400);
//     }

// }


?>