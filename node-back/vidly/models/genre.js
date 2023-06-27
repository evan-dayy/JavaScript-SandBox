const Joi = require('joi');
const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', GenreSchema);

function validateGenre(genre) {
  Joi.Ob
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}

exports.Genre = Genre; 
exports.validate = validateGenre;
exports.GenreSchema = GenreSchema;
