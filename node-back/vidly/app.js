const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local'); 
const TransactionDebugger = require('debug')('app:transaction')

const express = require('express');
const winston = require('winston');


// app
const app = express();
require('./startup/logging')(); // debuggers and error handler
require('./startup/config')(); // configuration
require('./startup/validation')(); // Joi validation
require('./startup/routes')(app); // routers and middleware
require('./startup/db')(); // database connection

// all set, start the server

module.exports = app; // for testing