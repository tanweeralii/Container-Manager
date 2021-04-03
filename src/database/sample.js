require('./setup');
const bcrypt = require('bcryptjs');

require('dotenv').config({path: './src/env/.env'});

const Users = require('./models/user');
var encrypted = bcrypt.hashSync('testpassword',parseInt(process.env.SALTROUNDS));

const user =[
    {
        username:'test',
        password: encrypted,
    },
];

Users.create(user).then(async(res) => {
    console.log("Test account created");
}).catch((err)=>{
    console.log(err);
});