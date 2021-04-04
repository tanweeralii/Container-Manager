const api = require('express').Router();

const {jwtVerify} = require('../middlewares/jwt');

const TERM = require('./routers/terminal');
const UPLO = require('./routers/upload');
const CONT = require('./routers/containers');

//containers
api.use('/container',jwtVerify, CONT.getContainerLogsRouter);
api.use('/container',jwtVerify, CONT.restartContainerRouter);
api.use('/container',jwtVerify, CONT.startContainerRouter);
api.use('/container',jwtVerify, CONT.stopContainerRouter);
api.use('/container',jwtVerify, CONT.listContainersRouter);
api.use('/container',jwtVerify, CONT.listImagesRouter);
api.use('/container',jwtVerify, CONT.listRunningContainersRouter);

//terminal
api.use('/terminal',jwtVerify, TERM.terminalRouter);

//upload
api.use('/upload', UPLO.uploadFileRouter);
api.use('/upload', UPLO.ListDirectoriesRouter);

module.exports = api;