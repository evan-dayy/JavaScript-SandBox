const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email : {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin : Boolean
  });

schema.methods.generateToken = function() {
    return jwt.sign({_id : this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
} // way to encapsulate a method in the scehma

const User = mongoose.model('User', schema);


function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), // make sure it is unique
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;

