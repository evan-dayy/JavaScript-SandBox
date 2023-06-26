const mongoose = require('mongoose');
const Joi = require('joi');
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const { GenreSchema } = require('./genre')

const Moive = mongoose.model('movie', new mongoose.Schema({
    title : {
        type : String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre : {
        type : GenreSchema,
        require: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().max(255).min(5).required(),
        genreId: Joi.string().required(), // independent with the mongo schema
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255)
    });
    return schema.validate(movie);
}


exports.Movie = Moive;
exports.alidateMovie = validateMovie

