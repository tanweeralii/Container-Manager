const jwt = require("jsonwebtoken");

const createJWTtoken = async (user) => {
    return jwt.sign({
        "user_id":user._id,
        "username": user.username,
    },
        process.env.TOKEN_SECRET,
        { expiresIn: '168h' }
    );
};

const jwtVerify = async (req, res, next) => {
    const token = req.header('Authorization')
    try {
        if (!token)
            return res.status(401).json({ message: "Non existent headers" })
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.jwt_payload = verified.data;
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Invalid token" })
    }
};

module.exports = {
    jwtVerify, createJWTtoken
};