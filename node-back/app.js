
// Module
function sayHello(name) {
    console.log("Hello! " + name);
}
sayHello("Evan")

// global in node is like window object in browser
// variables defined in each file will not attached to the global, it is not attached to the current file as well (module)
// each file is considering as a module

let message = 12;
console.log(global.message); // expected undefined
console.log(module.message); //expected undefined
console.log(message); //expected 12
console.log(module);

// loading a modules (CommonJS) 
// const logger = require('./logger.js')
// ES6 import:
// import { log } from './logger.mjs';
// log("this is another pattern trying to import the files")
// console.log(logger);
// logger.log("Let's test this is loader functions")

// let's go into some build-in module
// path module
const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);

// OS module 
const os = require('os');
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());
console.log(os.hostname());

// Files System Module
const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files);
// const Afiles = fs.readdir('./', (err, files) => {
//     if (err) console.log(err);
//     else console.log(files);
// });

// Event Modules, it is a class
// one emitter for one event handler
const EventEmitter = require('events'); // a class
// const emitter = new EventEmitter(); // an object

// regsiter a listener:
// emitter.on(); // jquery - alias of the addListener

// we also want to send some data to that event: events arguments
// emitter.emit('messageLogged', { id: 1, url: "https://" }) // raise an event
// console.log("checked the order")
const Logger = require("./logger.js")
const logger = new Logger();

logger.on('messageLogged', function(arg) {
    console.log(arg);
})

logger.log('message');

// HTTP Modules
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    } else if (req.url == '/app/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);
console.log("Listening on port-3000 ....")

// in real world application,
// we use express to manage the 




