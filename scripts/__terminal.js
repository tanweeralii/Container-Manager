$('body').terminal(function(command){
    if (command !== '') {
        $.post('terminal_command',{'command':command},function(req,res){
            var object = JSON.parse(req);
            var object1 = JSON.parse(object.message);
            this.echo("[[gb;green;black]" + object1 + "]");
        })
    }
}, {
        greetings: 'Get access to your Docker terminal',
        name: 'js_demo',
        prompt: 'Docker> '
});