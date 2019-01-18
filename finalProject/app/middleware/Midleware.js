//const model = require("../models/indexModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/User');
//https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
const key = "secret";
exports.verifyToken = (req,res,next) => {
    const token = req.cookies.logInUser;
    if(!token) res.status(403).redirect('/');
    jwt.verify(token, key, (err,deco)=>{
        if(err) res.status(403).redirect('/');
        req.token=deco;
        next();
    });
}
//exports.verifyAdd = ()
