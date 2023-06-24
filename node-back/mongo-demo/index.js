const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database');
mongoose.connect('mongodb://localhost:27017/playground') // function will return a promise
 .then(() => DatabaseDebugger("Connected to MongoDB...."))
 .catch((err) =>  DatabaseDebugger("Cannot connected to it", err));

// creating a data scehma: what does a record looks like in a collections
const courseSchema = new mongoose.Schema({
    // datatype in MongoDB: String, Number, Date, Buffer (binary data), array, Object-ID, Boolean
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// creating a collection in database
const Course = mongoose.model('Course', courseSchema); // model => schema; instance => class

// add course into the database
async function createCourse() {
    const course = new Course({
        name: "Yichao's Best COurses",
        author: "Evans Dat",
        tags: [ 'node', 'back-end' ],
        // date: { type: Date, default: Date.now },
        isPublished: true
    })
    
    const result = await course.save();
    DatabaseDebugger(result);
    DatabaseDebugger(24);
}
// createCourse();

// Database CRUD Operation 
// create, read, update, Delete


// read
async function getCourses() {
    const courses = await Course
        .find({ author : 'Evans Dat'})
        .limit(10)
        .sort({ name : 1 }) // 1 for asending and -1 for desending
        .select({ name: 1, tags: 1 }); 
    console.log(courses);
}
// getCourses();

/**
 * Comparison Operator
 * @$eq equal 
 * @$ne not equal
 * @$gt  greater than
 * @$gte greater than or eqaul
 * @$lt less than
 * @$lte less than or equal
 * @$in in
 * @$ni not in
 * 
 * Logical 
 * @and
 * @or
 */


async function getComplexCourse() {
    const course = await Course
        // comparison
        // .find({price : 10});
        // .find({price : {$gte : 10}});
        // .find({price : {$gt: 10, $lt: 20}});
        // .find({price : {$in : [10, 15, 50]}}); // 10 or 15 or 50
        // logical
        // .find()
        // .or([{author : 'mosh'}, {isPublished : true}]); // same as and
        .find({author : /^Mosh/}) // regular expression
        // /^Mosh/ start with
        // /Mosh$/ end with
        // /^Mosh/i case insensitive
        // /.*Mosh.*/ contains with
        .count() // count how many
        // pagination
        .skip(10 * 4) // read the 5th page
        .limit(10)
}

/**
 * @update
 * 
 * 1. query first and update
 * 2. directly update in the database
 * 
 */ 
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = "another authoer";
    // another approach
    // course.set({});
    const result = await course.save();
    console.log(result);
}
// updateCourse('649631908f7da877d04c8901');


async function updateCourse2(id) {
    // updateOne
    // updateMany
    // findByIdAndUpdate({pattern}, {$set: {setting}, {new : true}}) --- new setting will return object after modification 
    const result = await Course.findByIdAndUpdate({_id : id}, {
        $set : {
            author : "Yichao Dai - Evan*jkahksdjhkajhsd"
        }
    }, {new : true}); // or more generic {isPublished : true};
    console.log(result);
}
// updateCourse2('649631908f7da877d04c8901');



// delete

async function deleteCourse(id) {
    // or findand remove or find and delete
    const result = await Course.deleteOne({_id : id})
    console.log(result)
}

// deleteCourse('649631908f7da877d04c8901');

/**
 * Data Validation: MongoDB does not care why the data format follows your scehma
 * 
 * 1. 
 * mongoose.Schema({
 *      name : {type: String, required: true, default: 'abc'}
 * })
 * 
 * 2. course.validate(); // active validate
 * 
 */

// build-in validation
const courseSchema2 = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 10,
        match: /^Mosh/
    },
    category: {
        type: String,
        required: true,
        enum: ["Web", "Phone", "Front-End"] // the onlu value they can pick
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished;},
        min: 20,
        max: 100 
        // prefix with the isPublished
        // () arrow function's this property inheritate from super context, so we cannot use arrow function here
        // since this is null here
    }
});


// Coustomized Validations 
const courseSchema3 = new mongoose.Schema({
    tags: {
        type: Array,
        validate: {
            validator : function(v) {
                return (v && v.length > 0);
            },
            message: "The tags should have at least one tag"
        }
    }
});

// Async Validations
// sometimes the validation process may invlove in a reading database process or http process
// as a result, we may not have answer straight way
// which suggesting we need async validations 
const courseSchema4 = new mongoose.Schema({
    tags: {
        type: Array,
        validate: {
            validator : function(v) {
                return (v && v.length > 0);
            },
            message: "The tags should have at least one tag"
        }
    }
});