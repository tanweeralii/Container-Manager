var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/main',function(req,res){
	res
        .status(200)
		.sendFile(path.join(__dirname,"main.html"));
});

app.get('/webtty',function(req,res){
  res
        .status(200)
    .sendFile(path.join(__dirname,"terminal.html"));
});

app.get('/index',function(req,res){
    res
        .status(200)
        .sendFile(path.join(__dirname,"index.html"));
})

app.post('/list_running_containers',function(req,res){
    var request = require('request');
    request('http://localhost:5000/containers/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
        console.log(message);
      }
      res.json({message: message});
    });
});


app.post('/list_available_images',function(req,res){
    var request = require('request');
    request('http://localhost:5000/images/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      res.json({message: message});
    });
});

app.post('/list_all_containers',function(req,res){
    var request = require('request');
    request('http://localhost:5000/containers/json?all=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      res.json({message: message});
    });
});

app.post('/stop_container',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/stop', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      res.json({message: message});
    });
});

app.post('/start_conatiner',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/start', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      res.json({message: message});
    });
});

app.post('/restart_container',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/restart', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      res.json({message: message});
    });
});

app.post('/get_container_logs',function(req,res){
    var request = require('request');
    request('http://localhost:5000/containers/'+req.body.id+'/logs?stderr=1&stdout=1&timestamps=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      var decode = JSON.stringify(message);
      function splitStr(str) { 
        var string = str.split("exit");
        res.json({string: string}); 
      }
      splitStr(message);
    });
});

app.post('/terminal_command',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.container_id+'/exec',,function(error,response,body){
        if(!error&&response.statusCode==200){
          var message = body;
        }
        res.json({message: message});
    })
})

app.listen(4000);
console.log("started");
