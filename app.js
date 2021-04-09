require('dotenv').config({ path: './src/env/.env' });
const cors = require('cors');
const express = require('express');
const app = express();
const upload = require('express-fileupload');
const port = process.env.APP_PORT;

require('./src/database/setup.js');
//require('./src/database/sample.js');

const apiRouter = require('./src/api/api');
const authRouter = require('./src/api/auth');

app.set('view engine', 'ejs');
app.use(upload());
app.use(express.static(__dirname + '/static'));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.get('/',function(req,res){
	res.render('pages/main');
});

app.get('/webtty',function(req,res){
  res.render('pages/terminal');
});

app.get('/upload',function(req,res){
  res.render('pages/upload');
});

app.get('/login', function(req,res){
  res.render('pages/login');
});

app.listen(port, () => console.log('server started at port ' + port));