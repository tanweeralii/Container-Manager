const logoutRouter = require('express').Router();

logoutRouter.get('/', async function (req, res){
    try {
        return res.status(200)
        .cookie('token', '', {maxAge: 0})
        .json({message: 'Successfully loggedout!'});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: 'Server error. Try again later.'
        });
    }
});

module.exports = logoutRouter;