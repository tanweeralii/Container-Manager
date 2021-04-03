var BASE_URL = "http://localhost:3000/";
var n = localStorage.getItem("token")
console.log(n);

if(!n) n=0;

const Http = new XMLHttpRequest();
const url=BASE_URL+"auth/auth/";
Http.open("POST", url);
Http.setRequestHeader("Authorization",JSON.parse(n));
Http.send();

Http.onreadystatechange = (e) => {
    console.log("jello");
    x=JSON.parse(Http.responseText);
    if(x.status_code!=200)
        location.replace(BASE_URL+"login")
}

$('body').terminal(function(command){
    if (command !== '') {
        var container_id = sessionStorage.getItem("DockerID");
	console.log(container_id)
        var result = function () {
            var tmp = null;
            $.ajax({
                'async': false,
                'type': "POST",
                'global': false,
                'dataType': 'html',
                'url': 'terminal_command',
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
