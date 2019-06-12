<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        include_once '/app/accountService/models/User.php';
            $arr = explode(',',$mailsSh);
            // $url = 'app/accountService/api/gmApi.php';
            // $ch = curl_init($url);
            // $headers = array(
            //     'Content-Type:application/json',
            //     'Accept: application/json'
            // );
            $result = '';
            for($i=0;$i<count($arr);$i++){
                // $data = ["mail"=>$arr[$i]];
                // curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'POST');
                // curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));
                // curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                //$result .= (string)getByMail($arr[$i]);
                file_put_contents('a.txt',$arr[$i]);
                $v = getByMail($arr[$i]);
            }
            // curl_close($ch);
            // //$result .= $idSh;
            file_put_contents('out.txt',$result);
    ?>
</body>
</html>