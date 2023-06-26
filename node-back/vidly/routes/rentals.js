const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
// Fawn.init("mongodb://localhost/vidly"); // directly coonect to localhost // Fawn is depreciated

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');
  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  
  // Transaction
  await rental.save()
  DatabaseDebugger(movie._id);
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      rental.save();
      const new_movie = await Movie.findByIdAndUpdate({_id : movie._id}, {
        $inc : {
            numberInStock : -1
        }
      }, {new : true});
      res.send(rental);
    });
  } catch(err) {
    DatabaseDebugger("Something crash or goes wrong ....")
  } finally {
    await session.endSession();
  }
});


router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

module.exports = router; 