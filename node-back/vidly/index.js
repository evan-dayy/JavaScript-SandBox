const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local'); 
const morgan = require('morgan');
const config = require('config')

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



async function connect() {
  await mongoose.connect(config.get("dbserver") 
                        + config.get("dbuser") 
                        + config.get("dbpassword") 
                        + config.get("dbconnection"))
    .then(() => DatabaseDebugger('Connected to MongoDB...'))
    .catch(err => DatabaseDebugger('Could not connect to MongoDB...'));
}
connect()

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/middleware/error', error);


const port = process.env.PORT || 3000;
app.listen(port, () => HttpDebugger(`Listening on port ${port}...`));