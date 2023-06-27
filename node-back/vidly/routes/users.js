const {User, validate} = require('../models/user'); 
const auth = require('../middleware/auth');
const _ = require('lodash');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require('express');
const router = express.Router();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const bcrypt = require('bcrypt'); // password hashing


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email : req.body.email });
    if (user) return res.status(400).send('User has already existed');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const token = user.generateToken(); // method defined in model
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  });

router.get('/me', auth, async (req, res) => {
   const user = await User.findById(req.user._id).select("-password");
   res.send(user);
});

module.exports = router;
  