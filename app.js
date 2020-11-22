var express = require('express');
var path = require('path');
var querystring = require('querystring');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
var upload = require('express-fileupload');
const { exec } = require('child_process');
var app = express();

app.use(upload());
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

app.get('/upload',function(req,res){
    res
        .status(200)
        .sendFile(path.join(__dirname,"upload.html"));
})

app.post('/list_running_containers',function(req,res){
    console.log("hello");
    var request = require('request');
    request('http://localhost:5000/containers/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
        console.log(message);
      }
      res.json({message: message});
    });
});


app.post('/upload',function(req,res){
    if(req.files){
      console.log(req.body.id_of_container);
      console.log(req.body.path_in_container)
      var file = req.files.upload_file;
      var filename = file.name;
      console.log(filename);
      file.mv('./uploads/'+filename, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("File Uploaded");
          const dockerFileUploadCommand = `sudo docker cp /var/www/html/Container-Manager/uploads/${filename} ${req.body.id_of_container}:${req.body.path_in_container}`;
          exec(dockerFileUploadCommand, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          });
          const delete_file = `sudo rm ./uploads/${filename}`;
          exec(delete_file, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          });
        }
      });
    }
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
    var post_data = {
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["bash","-c",req.body.command]
    };
    
    request({
      url: 'http://localhost:5000/containers/'+req.body.container_id+'/exec',
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",  
      },
      body: post_data
    }, function (error, response, body){
      console.log(response.body)
      if(!error){
        var post_data_again = {
          Detach: false,
          Tty: false
        };
        request({
          url: 'http://localhost:5000/exec/'+body.Id+'/start',
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: post_data_again
        }, function(error, response, body){
          if(!error){
            console.log(body);
            res.json({message: body});
          }
          else{
            console.log(error);
          }
        })
      }
      else{
        console.log("ERROR");
        console.log(error);
      }
    });

    /*request.post('http://localhost:5000/containers/'+req.body.container_id+'/exec',
      {
        "AttachStdin": "false",
        "AttachStdout": "true",
        "AttachStderr": "true",
        "DetachKeys": "ctrl-p,ctrl-q",
        "Tty": "false",
        "Cmd": [
          "\"" + command[0] + "\""
        ],
        "Env": [
          "FOO=bar",
          "BAZ=quux"
        ]
      },
      function(error,response,body){
        if(!error&&response.statusCode==201){
          var message = body;
          console.log(body);
        }
        else{
          console.log(error);
          console.log("its a error");
          console.log(response.statusCode);
        }
        /*res.json({message: message});
    })*/
}); 

app.listen(4000);
console.log("started");
