const { update, remove } = require('lodash');
const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database')

mongoose.connect('mongodb://localhost/playground')
  .then(() => DatabaseDebugger('Connected to MongoDB...'))
  .catch(err => DatabaseDebugger('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  authors: {
    type: [ authorSchema ],
    required: true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  DatabaseDebugger(result);
}

async function listCourses() { 
  const courses = await Course.find();
  DatabaseDebugger(courses);
}

async function addAuthor(id, author) {
  const course = await Course.findById(id);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(id, authorID) {
  const course = await Course.findById(id);
  const author = course.authors.id(authorID); // find that specific id
  course.authors.remove(author);
  course.save();
}

// createCourse('Node Course', [new Author({ name: 'Mosh' }), 
                            // new Author({name: 'John'})]
                            // );
// addAuthor('6498a28d64b13a9b903c5d04', new Author({name: 'Amy'}))
removeAuthor('6498a28d64b13a9b903c5d04', '6498a33b7d6a830c45851d0f');

