const express = require('express');
const router = express.Router();
const Joi = require('joi'); // help us to simple the validation process


const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}, 
];

router.get('/', (req, res) => {
    res.send(courses)
});

router.get('/:id', (req, res) => {
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    if (!course) return res.status(404).send("Course cannot be found");
    res.send(course);
});


router.post('/', (req, res) => {
    const { error } = validateCourses(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // look up the courese
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    if (!course) return res.status(404).send("Course cannot be found");
    // validate request
    // const result = validateCourses(req.body);
    const { error } = validateCourses(req.body);

    if (error) return res.status(400).send(error.details[0].message);
        
    // exist and how to process
    // update and send it back
    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req, res) => {
    // look up the courese
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    if (!course) return res.status(404).send("Course cannot be found");

    // try to delete it
    courses.splice(courses.indexOf(course), 1);
    // resend it
    res.send(course);
});


// JOI balidations
function validateCourses(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(body);
    return result;
}

module.exports = router;