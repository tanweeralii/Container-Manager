const terminalRouter = require('express').Router();
const request = require('request');

terminalRouter.post('/',function(req,res){
    var post_data = {
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ["bash","-c",req.body.command]
    };

    request({
        url: process.env.DOCKER_API_URL+'containers/'+req.body.container_id+'/exec',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: post_data
    }, function (error, response, body){
        if(!error){
            var post_data_again = {
                Detach: false,
                Tty: false
            };
            request({
                url: process.env.DOCKER_API_URL+'exec/'+body.Id+'/start',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: post_data_again
            }, function(error, response, body){
                if(!error){
                    res.json({message: body});
                }
                else{
                    console.log(error);
                }
            })
        }
        else{
            console.log(error);
        }
    });
});

module.exports = {terminalRouter};