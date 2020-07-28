function list_running_containers(){
	$.post('list_running_containers',function(req,res){
		result_area = document.getElementById('ans');
		while(result_area.firstChild){
		   	result_area.removeChild(result_area.firstChild);
		}
	    var obj = JSON.parse(req);
	    var message = JSON.parse(obj.message);
	    if(message==""){
	        const para = document.createElement('p');
	        row.textContent = "No Container is alive";
	        result_area.appendChild(para);
		    result_area.style.color = "white";
	    }
	    else{
	        message.forEach((message) => {
            	const li = document.createElement('li');
            	var result = message.Id.slice(0, 12).trim();
	           	li.textContent = message.Image + " , " + result;
	            result_area.appendChild(li);
	        })
	      	result_area.style.color = "white";
	    }
	});
}
function list_available_images(){
	$.post('list_available_images',function(req,res){
		result_area = document.getElementById('ans');
		while(result_area.firstChild){
		    result_area.removeChild(result_area.firstChild);
		}
	    var obj = JSON.parse(req);
	    var message = JSON.parse(obj.message);
	    const para = document.createElement('p');
	    para.textContent = "Example: If output is 'xyz:latest , sha256:b65575bf92725cad124e7c0d35d479ee23a3281cf066dcaba86c311bbe5e0e31', then the image name is 'xyz' and image id is first 12 digit of sha256 i.e., b65575bf9272 in this case";
	    hello.appendChild(para);
        message.forEach((message) => {
			const li = document.createElement('li');
            li.textContent = (message.RepoTags)[0] + " , " + message.Id;
           	result_area.appendChild(li);
        })
        result_area.style.color = "white";
	});
}
function list_all_containers(){
	$.post('list_all_containers',function(req,res){
		hello = document.getElementById('ans');
		while(hello.firstChild){
	        hello.removeChild(hello.firstChild);
	    }
	    var obj = JSON.parse(req);
	    var message = JSON.parse(obj.message);
       	message.forEach((message) => {
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
	var id = document.getElementById('input1').value;
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
	});
}