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
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});


app.post('/list_available_images',function(req,res){
    var request = require('request');
    request('http://localhost:5000/images/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/list_all_containers',function(req,res){
    var request = require('request');
    request('http://localhost:5000/containers/json?all=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/stop_container',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/stop', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/start_conatiner',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/start', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/restart_container',function(req,res){
    var request = require('request');
    request.post('http://localhost:5000/containers/'+req.body.id+'/restart', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.post('/get_container_logs',function(req,res){
    var request = require('request');
    request('http://localhost:5000/containers/'+req.body.id+'/logs?stderr=1&stdout=1&timestamps=1&follow=1&tail=10&since=1428990821', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      data = new Object();
      data.message = message;
      var str = JSON.stringify(data);
      res.send(str);
    });
});

app.listen(4000);
