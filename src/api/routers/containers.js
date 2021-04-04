const getContainerLogsRouter = require('express').Router();
const restartContainerRouter = require('express').Router();
const startContainerRouter = require('express').Router();
const stopContainerRouter = require('express').Router();
const listContainersRouter = require('express').Router();
const listImagesRouter = require('express').Router();
const listRunningContainersRouter = require('express').Router();

const request = require('request');

listRunningContainersRouter.post('/runningContainers',function(req,res){
    request(process.env.DOCKER_API_URL+'containers/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      res.json({message: message});
    });
});

listImagesRouter.post('/images',function(req,res){
    request(process.env.DOCKER_API_URL+'images/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      res.json({message: message});
    });
});

listContainersRouter.post('/allContainers',function(req,res){
    request(process.env.DOCKER_API_URL+'containers/json?all=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = body;
      }
      res.json({message: message});
    });
});

stopContainerRouter.post('/stopContainer',function(req,res){
    request.post(process.env.DOCKER_API_URL+'containers/'+req.body.id+'/stop', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      res.json({message: message});
    });
});

startContainerRouter.post('/startConatiner',function(req,res){
    request.post(process.env.DOCKER_API_URL+'containers/'+req.body.id+'/start', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var message = "Done";
      }
      res.json({message: message});
    });
});

restartContainerRouter.post('/restartContainer',function(req,res){
    request.post(process.env.DOCKER_API_URL+'containers/'+req.body.id+'/restart', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var message = "Done";
        }
        res.json({message: message});
    });
});

getContainerLogsRouter.post('/logs',function(req,res){
    request(process.env.DOCKER_API_URL+'containers/'+req.body.id+'/logs?stderr=1&stdout=1&timestamps=1', function (error, response, body) {
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

module.exports = {getContainerLogsRouter, restartContainerRouter, startContainerRouter, stopContainerRouter, listContainersRouter, listImagesRouter, listRunningContainersRouter};