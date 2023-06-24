const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
 .then(() => console.log("Connected to MongoDB...."))
 .catch((err) => console.log("Cannot connected to it", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Yichao's Best COurses",
        author: "Evans Dat",
        tags: [ 'node', 'back-end' ],
        // date: { type: Date, default: Date.now },
        isPublished: true
    })
    
    const result = await course.save();
    console.log(result);
    console.log(24);
}
createCourse();
// console.log(12);









