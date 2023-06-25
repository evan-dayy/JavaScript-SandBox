const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 

mongoose.connect('mongodb://localhost/vidly')
  .then(() => DatabaseDebugger('Connected to MongoDB...'))
  .catch(err => DatabaseDebugger('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => HttpDebugger(`Listening on port ${port}...`));