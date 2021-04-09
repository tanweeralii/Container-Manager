var BASE_URL = "http://localhost:3000/";
var n = localStorage.getItem("token")
if(!n) n=0;

const Http = new XMLHttpRequest();
const url=BASE_URL+"auth/auth/";
Http.open("POST", url);
Http.setRequestHeader("Authorization",JSON.parse(n));
Http.send();

Http.onreadystatechange = (e) => {
    x=JSON.parse(Http.responseText);
    if(x.status_code!=200)
        location.replace(BASE_URL+"login")
}
window.onload = function () {
    $('body').terminal(function(command){
        if (command !== '') {
            var container_id = sessionStorage.getItem("DockerID");
            var result = function () {
                var tmp = null;
                $.ajax({
                    'async': false,
                    'type': "POST",
                    'global': false,
                    'dataType': 'html',
                    'url': 'api/terminal',
                    'headers':{"Authorization":JSON.parse(n)},
                    'xhrFields':{
                        withCredentials: true,
                    },
                    'data': {'command':command, 'container_id':container_id},
                    'success': function (data) {
                        tmp = data;
                    }
                });
                return tmp;
            }();
            var result_final = JSON.parse(result);
            this.echo("[[gb;green;black]" + result_final.message + "]");
        }
    }, {
            greetings: 'Get access to your Docker terminal',
            name: 'js_demo',
            prompt: 'Docker> '
    });
}