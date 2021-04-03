const uploadFileRouter = require('express').Router();


uploadFileRouter.post('/upload',function(req,res){
    if(req.files){
		var file = req.files.upload_file;
		var filename = file.name;
      	file.mv('~/.uploads/'+filename, function(err){
			if(err){
				console.log(err);
			}
        	else{
				console.log("File Uploaded");
				const dockerFileUploadCommand = `sudo docker cp ~/.uploads/${filename} ${req.body.id_of_container}:${req.body.path_in_container}`;
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
          		const delete_file = `sudo rm ~/.uploads/${filename}`;
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

module.exports = {uploadFileRouter};