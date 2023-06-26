const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 

async function connect() {
  await mongoose.connect('mongodb://localhost/vidly')
    .then(() => DatabaseDebugger('Connected to MongoDB...'))
    .catch(err => DatabaseDebugger('Could not connect to MongoDB...'));
}
connect()

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => HttpDebugger(`Listening on port ${port}...`));