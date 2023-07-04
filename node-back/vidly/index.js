// databases
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const morgan = require('morgan');
const config = require('config')
const winston = require('winston');
require('winston-mongodb');
winston.add(new winston.transports.File({filename: 'logfile.log'})); // put the error in a log file

// debuggers and error handler
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local'); 
const error = require('express-async-errors')

// routers
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// app
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();

// // uncaught exception
// process.on('uncaughtException', (ex) => {
//   DatabaseDebugger('Uncaught Exception ...');
//   // winston.error(ex.message, ex);
//   // process.exit(1);
//   throw ex;
// })
// same as
winston.handleExceptions(new winston.transports.File({filename: 'uncaughtException.log'})); 


// check jwtPrivateKey
if (!config.get("jwtPrivateKey")) {
  LocalDebugger("Cannot find jwt Private Key in local environment ...")
  process.exit(1); // 0 indicate sucess, 1 indicate failure
}
LocalDebugger("Found jwt Private Key in local environment ...");

if (!config.get("dbuser") || !config.get("dbpassword")) {
  LocalDebugger("Cannot find DB user, currently we are using MongoDB Atlas ...")
  process.exit(1); // 0 indicate sucess, 1 indicate failure
}
LocalDebugger("Found Atlas DB user and password in local environment ...");

winston.add(new winston.transports.MongoDB(
  {db: `${config.get("dbserver")}${config.get("dbuser")}${config.get("dbpassword")}${config.get("dbconnection")}`,
  options: { useUnifiedTopology: true } // server discovery and monitoring enginer use option to enable
  // level : error, warn, info, verbose, debug, silly can be choses
}));

async function connect() {
  await mongoose.connect(config.get("dbserver") 
                        + config.get("dbuser") 
                        + config.get("dbpassword") 
                        + config.get("dbconnection"))
    .then(() => DatabaseDebugger('Connected to MongoDB...'))
    .catch(err => DatabaseDebugger('Could not connect to MongoDB...'));
}
connect();

// uncaught exception
// throw new Error('Uncaught Exception ...');
// unhandled rejection can also be caught by uncaught exception
// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(() => console.log('Done'));

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => HttpDebugger(`Listening on port ${port}...`));