const { update } = require('lodash');
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
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  DatabaseDebugger(result);
}

async function listCourses() { 
  const courses = await Course.find();
  DatabaseDebugger(courses);
}

// however, the sub-document only exist in the apearance of the parent document
// as a result, we can only find the course and then update it

async function updateCourse(id) {
  const course = await Course.findById(id);
  course.author.name = "Evans Day";
  return await course.save();
}

async function updateCourse2(id) {
  const course = await Course.updateOne({ _id: id}, {
    $set : {
      'author.name' : "John Wick"
    }
    // remove the nested relationship
    // $unset : {
    //   'author' : ""
    // }
  }, {new : true});
  return course;
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateCourse2('64989d884441814a27ac9595');

