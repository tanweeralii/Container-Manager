const auth = require('../auth');

const authRouter = require('express').Router()
require('dotenv').config({path: '../../src/env/.env'});

authRouter.post('/',async (req,res) =>{
    try{
        return res.status(200).json({
            status_code:200,
            message: 'page verified'
        });
    }
    catch{
        console.log(e.message);
        return res.status(500).json({ 
          status_code: 500,
          message : 'server error, Try again later.'});

    }
});

module.exports = authRouter;