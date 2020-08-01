$('body').terminal(function(command){
    if (command !== '') {
        var container_id = sessionStorage.getItem("DockerID");
        $.post('terminal_command',{'command':command, 'container_id':container_id},function(req,res){
            var obj = JSON.parse(req);
            var object = JSON.parse(obj.message);
            this.echo("[[gb;green;black]" + object + "]");
        })
    }
}, {
        greetings: 'Get access to your Docker terminal',
        name: 'js_demo',
        prompt: 'Docker> '
});