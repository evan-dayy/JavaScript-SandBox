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
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/root');

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
app.use('/api/courses', courses); // any request http start wiht api/courses, use this router
app.use('/', home);



// runing the enviroment
// enviroment variable: PORT
const port = process.env.PORT || 3000;
// how to setup the global envirioment port
// export PORT = 5000; on terminal

app.listen(port, () => {
    console.log(`Listening the port-${port}....`)
});


