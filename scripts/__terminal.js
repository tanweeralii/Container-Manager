$('body').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what + '. Wellcome to this terminal.');
	}
}, {
        greetings: 'My First Terminal\n'
});
$('body').terminal({
	title: function() {
        return fetch('https://terminal.jcubic.pl')
    	.then(r => r.text())
    	.then(html => html.match(/<title>([^>]+)<\/title>/)[1]);
    }
}, {
    greetings: 'My First Terminal\n'
});