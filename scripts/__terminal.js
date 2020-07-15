$('body').terminal(function(command){
    if (command !== '') {
        if(command=="hey")
            this.echo(command+' tanweer');
        else
            this.error("Unknown Command");
    }
}, {
        greetings: 'Get access to your Docker terminal',
        name: 'js_demo',
        prompt: 'Docker> '
});