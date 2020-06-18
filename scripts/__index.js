function list_running_containers(){
	$.post('list_running_containers',function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
		         	hello.removeChild(hello.firstChild);
		     	}
	         	var obj = JSON.parse(req);
	        	var obj1 = JSON.parse(obj.message);
	        	if(obj1==""){
	        		const p = document.createElement('p');
	        		p.textContent = "No Container is alive";
	        		hello.appendChild(p);
		        	hello.style.color = "white";
	        	}
	        	else{
	        		obj1.forEach((message) => {
            				const li = document.createElement('li');
            				var i = message.Id.slice(0, 12).trim();
	            			li.textContent = message.Image + " , " + i;
	            			hello.appendChild(li);
	        		})
	        		hello.style.color = "white";
	        	}
	});
}
function list_available_images(){
	$.post('list_available_images',function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
		         	hello.removeChild(hello.firstChild);
		}
	        var obj = JSON.parse(req);
	       	var obj1 = JSON.parse(obj.message);
	     	const p = document.createElement('p');
	        p.textContent = "Example: If output is 'xyz:latest , sha256:b65575bf92725cad124e7c0d35d479ee23a3281cf066dcaba86c311bbe5e0e31', then the image name is 'xyz' and image id is first 12 digit of sha256 i.e., b65575bf9272 in this case";
	        hello.appendChild(p);
        	obj1.forEach((message) => {
			const li = document.createElement('li');
            		li.textContent = (message.RepoTags)[0] + " , " + message.Id;
           		 hello.appendChild(li);
        	})
        	hello.style.color = "white";
	});
}
function list_all_containers(){
	$.post('list_all_containers',function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
	         	hello.removeChild(hello.firstChild);
	     	}
	        var obj = JSON.parse(req);
	        var obj1 = JSON.parse(obj.message);
        	obj1.forEach((message) => {
        		console.log(message);
		        const li = document.createElement('li');
		       	var i = message.Id.slice(0, 12).trim();
            		li.textContent = message.Image + " , " + i;
            		hello.appendChild(li);
        	})
        	hello.style.color = "white";
	});
}
function stop_container(){
	console.log(id);
	document.getElementById('input1').value = "";
	$.post('stop_container',{'id':id},function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
			hello.removeChild(hello.firstChild);
		}
	        const p = document.createElement('p');
	        p.textContent = "Done";
	        hello.appendChild(p);
		hello.style.color = "white";
	});
}
function start_container(){
	var id = document.getElementById('input2').value;
	document.getElementById('input2').value = "";
	$.post('start_conatiner',{'id':id},function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
		         hello.removeChild(hello.firstChild);
		}
	        const p = document.createElement('p');
		p.textContent = "Done";
	        hello.appendChild(p);
        hello.style.color = "white";
	});
}
function restart_container(){
	var id = document.getElementById('input3').value;
	document.getElementById('input3').value = "";
	$.post('restart_container',{'id':id},function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
		        hello.removeChild(hello.firstChild);
		}
	        const p = document.createElement('p');
	        p.textContent = "Done";
	        hello.appendChild(p);
        	hello.style.color = "white";
	});
}
function container_logs(){
	var id = document.getElementById('input4').value;
	document.getElementById('input4').value = "";
	$.post('get_container_logs',{'id':id},function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
			hello.removeChild(hello.firstChild);
		}
	        var obj = JSON.parse(req);
	        var res = obj.message.split("exit");
	        res.forEach((message) => {
		const li = document.createElement('li');
		var res1 = message.split("exit");
            	li.textContent = res1;
            	hello.appendChild(li);
        	hello.style.color = "white";
	});
}
jQuery(function($, undefined) {
 $('#term_demo').terminal(function(command) {
   if (command == 'help') {
     this.echo("Type the following.\n");
     this.echo("1. Companies worked for or experience=> exp")
     this.echo("2. Socials => social\n");
   } 
 
 //  if (command == 'social'){ .  This was wrong. 
   else if (command == 'social'){
     this.echo("mailto:tanweerali908@gmail.com\n")
   }

//   if (command == 'exp'){ .This was wrong. 
   else if (command == 'exp'){
     this.echo("\n")
     this.echo("Platform Engineer, Practo technologies. Jan 2017 - Present\n\n")
     this.echo("\n")
     this.echo("Software Developement Engineer, Practo technologies. May 2016 - Dec 2016\n\n")
     this.echo("\n")
     this.echo("Freelance Software Architect, Unihire. Mar 2016 - April 2016\n\n")
     this.echo("\n")
     this.echo("Laravel and Angular Developer, Infinite Eurekas. Oct 2015 - Nov 2015\n\n")
     this.echo("\n")
     this.echo("Python Developer, Lazylad. Sep 2015 - Oct 2015\n\n")
     this.echo("\n")
     this.echo("Software Developer, Frankly.me, May 2015 - Jul 2015\n\n")
     this.echo("\n")
     this.echo("Software Developer, GeekShastra Pvt Ltd, May 2014 - Jul 2014\n\n")
     this.echo("\n")
     this.echo("Software Developer, Decent Solutions, Dec 2013 - Mar 2014\n\n")
     this.echo("\n")
   }

   else {
     if (command !== '') {
       try {
         var result = window.eval(command);
         if (result !== undefined) {
           this.echo(new String(result));
         }
       } catch(e) {
         this.error(new String(e));
       }
     } else {
       this.echo('');
     }
   }
 

 }, {
 greetings: 'Hi dere, terminal addicts. want help any time just type help',
 name: 'chowmean.github.io',
 prompt: 'chowmean.github.io> ',
 color: 'green'
 });
});
