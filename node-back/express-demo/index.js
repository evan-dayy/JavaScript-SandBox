// Restful Service -- Restful API
// HTTP protocal that support create, read, update, and delete data (CRUD Operation) : RESTful service
// HTTP method: GET, POST, PUT, DELETE

// GET ./app/customers (request) -> (respoend)....
/**
 * @return: two property {error, value}
 */
const startUpDebugger = require('debug')('app:startUp'); // a namespace for debugging
const dbDebugger = require('debug')('app:db');
const config = require('config');
const logger = require('./logger');
const morgan = require('morgan');
const Joi = require('joi'); // help us to simple the validation process
const express = require('express');
const app = express();

/**
 * @global: process.env
 * @NODE_ENV machine enviroment for this node application
 * @value development, testing, staging, production
 */
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`); // default is development
// console.log(process.env);

/**
 * @configuration : process.env
 * @config
 * all locanted in config files
 * @custom-environment-variables: for the passport and secret information
 */
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

/**
 * @debugPackage
 * 1. do not need to go back to uncomment, set up env variable to control it
 * 2. see the differen namespace debugging information we want (database, or networking)
 * 
 * export DEBUG=app:startUp : name space
 * export DEBUG=app:startUp, app:db : name space
 * export DEBUG=app:*
 * DEBUG=app:db nodemon index.js
 */

//db debugger
dbDebugger("Connecting to the databse ....");


/**
 * @templateEngineering
 * 
 */
app.set('view engine', 'pug');
app.set('views', './views'); //customized template, override the previous one
app.get('/app', (req, res) => {
    res.render('index', { title: "App", message: "Render Template"});
});


/**
 * Advance Topic About Express
 * @MiddleWare
 * take a request object, return a respond object to client or pass to another middleware 
 * @customized function(req, res, next)
 * @example: res.send() // respond handler function
 * @example: app.use(express.json()) [request -> (if JSON file in body => parse it to a JSON object => reset the request.body to this JSON Object)] -> ...
 * request -> json() -> route() -> respond
 * 
 * @buildin express.json();
 * @buildin express.urlencoded();
 * @buildin express.static('root')
 * 
 * useful
 * @Thirdparty helmet
 * @Thirdparty morgan // log the request
 * 
 * 
 */

app.use(express.json()); //adding a piece of middleware || parse to JSON Object
app.use(express.urlencoded({extended: true})) // encoded url to a JSON object
app.use(express.static("public")); // display a file in public // localhost:3000/readme.txt // all the static file shoudld be in "public"
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startUpDebugger("Morgan enabled....")
}


// defined in antoher file
// app.use(logger);

// app.use(function(req, res, next) {
//     console.log("Authenticating..");
//     next(); // think it as a default function, pass to next router
// });



const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}, 
];

app.get('/', (req, res) => {
    res.send("Send back a respond!!!!");

});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    if (!course) return res.status(404).send("Course cannot be found");
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourses(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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

// runing the enviroment
// enviroment variable: PORT
const port = process.env.PORT || 3000;
// how to setup the global envirioment port
// export PORT = 5000; on terminal

app.listen(port, () => {
    console.log(`Listening the port-${port}....`)
});


