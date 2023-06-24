// how to import the data in terminal from a json array
// mongoimport --db database_name --collection collection_name --drop --file data.json --jsonArray
const mongoose = require('mongoose');
const DatabaseDebugger = require('debug')('app:database')
mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => DatabaseDebugger("Conections are successful"))
    .catch(e => {DatabaseDebugger('Connection are failed...')});

const courseScehma = mongoose.Schema({
    name : String,
    author : String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const customersScehma = mongoose.Schema({
    name : String,
    author : String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('courses', courseScehma);
const Customer = mongoose.model('customer', customersScehma);

async function getCourses() {
    return await Course
        .find({isPublished : true, tags: 'backend'})
        .sort({ name : 1 })
        .select({ author : 1, name : 1});
}

async function run(){
    const res = await getCourses()
    DatabaseDebugger(res);
}
run();
