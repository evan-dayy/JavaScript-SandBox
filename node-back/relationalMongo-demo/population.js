/**
 * There are three types of relational building in MongoDB
 * 1. Normalization (same as relational database) ---> consistency method (but double querying)
 * 2. DeNormalization (using the embedded structure, document inside a document) ---> efficient method
 * 3. Hybrid - representation ()
 * 
 * 
 * 
 */

const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database');

mongoose.connect('mongodb://localhost/playground')
  .then(() => DatabaseDebugger('Connected to MongoDB...'))
  .catch(err => DatabaseDebugger('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });
  const result = await author.save();
  DatabaseDebugger(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  const result = await course.save();
  DatabaseDebugger(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name bio-_id') // connected to author's ref property  // notice how to select augument a b-_id (select a and b not include_id)
    // .polulate we can populate multipy things
    .select({
      'name' : 1,
      'author': 1
    });
  DatabaseDebugger(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '6498975c9a709ca96457a036')

listCourses();