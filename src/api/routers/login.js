const loginRouter = require('express').Router();
const { createJWTtoken} = require('../../middlewares/jwt');
require('dotenv').config({path: '../../src/env/.env'});

const axios = require("axios");
const bcrypt = require("bcryptjs");
var mongoose = require('mongoose');
const { profile } = require('console');
User = mongoose.model('users');

loginRouter.post('/', async (req, res)=>{
    try{
        const { username, password} = req.body;
        const hashpwd = bcrypt.hashSync(password,parseInt( process.env.SALTROUNDS));
        await User.findOne({username:username},async (err, user)=> {
            if (err) throw err;
            if (!user){
                return res.status(200).json({
                    status_code: 401,
                    message: 'Authentication failed. User Does not Exists.'
                })
            }
            else if (!bcrypt.compareSync(password, user.password)) {
                return res.status(200).json({
                    status_code: 401,
                    message: 'Authentication failed. Invalid password.'
                });
            }
            else{
                await createJWTtoken(user).then((token)=>{
                    return res.status(200)
                    .cookie('token', token, { maxAge: 604800000})
                    .json({
                        status_code:200,
                        jwt_token: token,
                        message:'Success',
                    });
                }).catch((e)=>{
                    return res.status(500).json({
                        status_code: 500,
                        message: 'server error, Try again later.'
                    });
                });
            }
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({ 
          status_code: 500,
          message : 'server error, Try again later.'
        });
    }
});

module.exports = loginRouter;