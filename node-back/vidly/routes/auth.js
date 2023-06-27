const {User} = require('../models/user'); 
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const bcrypt = require('bcrypt'); // password hashing
const config = require('config');


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email : req.body.email });
    if (!user) return res.status(400).send('Invalid Email or password...');
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid Email or password...');
    // res.send(isValid); //However, we should return a JSON web token, to identify the user's authentication verfication (JWT)
    /**
     * Including three parts
     * @Header
     * @payload (info)
     * @Signature 
     */
    // const token = jwt.sign({_id : user._id}, 'jwtPrivateKey') // jwtPrivateKey should put in a local envrioment, dnt do this 
    // const token = jwt.sign({_id : user._id}, config.get('jwtPrivateKey')) // also apear in users, as a result, we wants users to generate it
    const token = user.generateToken();
    // the token can be decrypted in jwt.io
    res.send(token); // sometomes we may want to directly log in the user instead of log in in a seperated request
  });

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(), // make sure it is unique
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

module.exports = router;
  