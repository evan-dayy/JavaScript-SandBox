const Joi = require('joi');
const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateGenre(genre) {
  Joi.Ob
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre, schema);
}

exports.Genre = Genre; 
exports.validate = validateGenre;