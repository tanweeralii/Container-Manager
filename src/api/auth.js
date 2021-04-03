const auth =require('express').Router();

const jwtMiddleware= require('../middlewares/jwt');

const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const authRouter = require('./routers/auth');

auth.use('/login', loginRouter);
auth.use('/logout',jwtMiddleware.jwtVerify, logoutRouter);
auth.use('/auth',jwtMiddleware.jwtVerify, authRouter);
module.exports = auth;