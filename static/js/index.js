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

function list_running_containers(){
	$.ajax({
		url: 'api/container/runningContainers',
		type: 'POST',
		headers:{"Authorization":JSON.parse(localStorage.getItem("token"))},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			var obj = JSON.parse(req.message);
			if(obj==""){
				const para = document.createElement('p');
				para.textContent = "No Container is alive";
				result_area.appendChild(para);
				result_area.style.color = "white";
			}
			else{
				obj.forEach((message) => {
					const li = document.createElement('li');
					var result = message.Id.slice(0, 12).trim();
					   li.textContent = message.Image + " , " + result;
					result_area.appendChild(li);
				})
				  result_area.style.color = "white";
			}
		}
	});
}

function list_available_images(){
	$.ajax({
		url: 'api/container/images',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			var obj = JSON.parse(req.message);
			const para = document.createElement('p');
			para.textContent = "Example: If output is 'xyz:latest , sha256:b65575bf92725cad124e7c0d35d479ee23a3281cf066dcaba86c311bbe5e0e31', then the image name is 'xyz' and image id is first 12 digit of sha256 i.e., b65575bf9272 in this case";
			result_area.appendChild(para);
			obj.forEach(message => {
				const li = document.createElement('li');
				li.textContent = (message.RepoTags)[0] + " , " + message.Id;
				result_area.appendChild(li);
			})
			result_area.style.color = "white";
		}
	});
}

function list_all_containers(){
	$.ajax({
		url: 'api/container/allContainers',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			var obj = JSON.parse(req.message);
			obj.forEach((message) => {
				console.log(message);
				const li = document.createElement('li');
				var result = message.Id.slice(0, 12).trim();
				li.textContent = message.Image + " , " + result;
				result_area.appendChild(li);
			})
			result_area.style.color = "white";
		}
	});
}

function stop_container(){
	var id = document.getElementById('input1').value;
	document.getElementById('input1').value = "";
	$.ajax({
		url: 'api/container/stopContainer',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		data: {'id': id},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			const para = document.createElement('p');
			para.textContent = "Done";
			result_area.appendChild(para);
			result_area.style.color = "white";
		}
	});
}

function start_container(){
	var id = document.getElementById('input2').value;
	document.getElementById('input2').value = "";
	$.ajax({
		url: 'api/container/startConatiner',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		data: {'id': id},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			const para = document.createElement('p');
			para.textContent = "Done";
			result_area.appendChild(para);
			result_area.style.color = "white";
		}
	});
}

function restart_container(){
	var id = document.getElementById('input3').value;
	document.getElementById('input3').value = "";
	$.ajax({
		url: 'api/container/restartContainer',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		data: {'id': id},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			const para = document.createElement('p');
			para.textContent = "Done";
			result_area.appendChild(para);
			result_area.style.color = "white";
		}
	});
}

function container_logs(){
	var id = document.getElementById('input4').value;
	document.getElementById('input4').value = "";
	$.ajax({
		url: 'api/container/logs',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		data: {'id': id},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			result_area = document.getElementById('ans');
			while(result_area.firstChild){
				result_area.removeChild(result_area.firstChild);
			}
			req.string.forEach(message => {
				var result = message.split("#");
				const li = document.createElement('li');
				li.textContent = result;
				result_area.appendChild(li);
				result_area.style.color = "white";
			});
		}
	});
}

function web_tty(){
	var container_id = prompt("Please enter Container ID");
	$.ajax({
		url: 'api/container/runningContainers',
		type: 'POST',
		headers:{"Authorization":JSON.parse(n)},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			var obj = JSON.parse(req.message);
			var flag=false;
			obj.forEach((message) => {
				var result = message.Id.slice(0, 12).trim();
				if(result==container_id){
					flag=true;
				}
			});
			if(flag==true){
				localStorage.setItem("DockerID", container_id);
				window.open(BASE_URL+"webtty","_parent");
			}
			else{
				alert(container_id + " is not running.");
			}
		}
	});
}

function upload(){
	window.open(BASE_URL+"upload","_blank")
};
