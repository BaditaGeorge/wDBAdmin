        document.getElementById('btn').addEventListener("click",onCallFunc);
        function onCallFunc(){
            fetch("/apiDet.php")
            .then(function(response){
                return response.text();
            })
            .then(function(myData){
                alert(myData);
            })
        }
        function onKeyP(e){
            // alert(String.fromCharCode(e.keyCode));
            fetch('/apiDet.php',{
                method: 'POST',
                body: String.fromCharCode(e.keyCode),
                headers: {'Content-type':'Text'}
            })
            // .then(function(response){
            //     return response.text();
            // })
            // .then(function(myData){
            //     alert(myData);
            // })
        }
        var el = document.getElementById('icht').value;
        // setInterval(function edit(){
        //     fetch('/apiDet.php',{
        //         method:'GET'
        //     })
        //     .then(function(response){
        //         return response.text();
        //     })
        //     .then(function(myData){
        //         if(myData !== document.getElementById('icht').value)
        //             document.getElementById('icht').innerHTML = myData;
        //     })
        // },30);
        function edit(){
            console.log('Salt');
            fetch('/apiDet.php',{
                method:'GET'
            })
            .then(function(response){
                return response.text();
            })
            .then(function(myData){
                if(myData !== document.getElementById('icht').value)
                    document.getElementById('icht').innerHTML = myData;
            })
            var t = setTimeout(function(){edit()},500);
        }
        function onKeyD(e){
            if(e.keyCode === 8){
                // alert('backspace');
                var info = 'backspace';
                fetch('/apiDet.php',{
                    method: 'POST',
                    body: info,
                    headers: {'Content-type':'Text'}
                })
                // .then(function(response){
                // return response.text();
                // })
                // .then(function(myData){
                // alert(myData);
                // })
            }
        }