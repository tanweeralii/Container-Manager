var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
	res
    .status(200)
		.sendFile(path.join(__dirname,"main.html"));
});

app.post('/list_running_containers',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker ps', (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "error";
      } else {
       var message = `stdout: ${stdout}`;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/list_available_images',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker images', (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "error";
      } else {
       var message = `stdout: ${stdout}`;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/list_all_containers',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker ps -a', (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "error";
      } else {
       var message = `stdout: ${stdout}`;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/stop_container',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker stop '+req.body.id, (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "Container is not active";
      } else {
       var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/start_conatiner',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker start '+req.body.id, (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "Container is already active";
      } else {
       var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/restart_container',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker restart '+req.body.id, (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "error";
      } else {
       var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/get_container_logs',function(req,res){
    const { exec } = require('child_process');
    exec('sudo docker container logs --timestamps '+req.body.id, (err, stdout, stderr) => {
      if (err) {
        console.error("error");
        var message = "error";
      } else {
       var message = `stdout: ${stdout}`;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/web_shell_for_container',function(req,res){
    var message = "To open a tty session of the container "+req.body.id+", go to http://localhost:4000/session";
    data = new Object();
    data.message = message;
    var str = JSON.stringify(data);
    res.send(str);
});

app.listen(4000);
