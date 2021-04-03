require('dotenv').config({path: './src/env/.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open' , () => console.log('connected to database'));

const Users = require('./models/user');