const uploadFileRouter = require('express').Router();
const ListDirectoriesRouter = require('express').Router();

const { exec } = require('child_process');

ListDirectoriesRouter.post('/ListDirectories', function(req, res){
	const dockerListDirectoriesCommand = `sudo docker exec -i ${req.body.id} /bin/bash -c "ls -d ${req.body.current_directory}/*/"`;
	exec(dockerListDirectoriesCommand, (error, stdout, stderr) => {
	  if (error) {
		console.log(`error: ${error.message}`);
		res.json({message:`${error.message}`})
		return;
	  }
	  if (stderr) {
		console.log(`stderr: ${stderr}`);
		res.json({message:`${stderr}`});
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  res.json({message:`${stdout}`});
	});
});


uploadFileRouter.post('/upload',function(req,res){
    if(req.files){
		var file = req.files.upload_file;
		var filename = file.name;
      	file.mv('./uploads/'+filename, function(err){
			if(err){
				console.log(err);
			}
        	else{
				console.log("File Uploaded");
				const dockerFileUploadCommand = `sudo docker cp ./uploads/${filename} ${req.body.id_of_container}:${req.body.path_in_container};sudo rm ./uploads/${filename}`;
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
        	}
      	});
    }
});

module.exports = {uploadFileRouter, ListDirectoriesRouter};