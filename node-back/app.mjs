
// Module
function sayHello(name) {
    console.log("Hello! " + name);
}
sayHello("Evan")

// global in node is like window object in browser
// variables defined in each file will not attached to the global, it is not attached to the current file as well (module)
// each file is considering as a module

let message = 12;
// console.log(global.message); // expected undefined
// console.log(module.message); //expected undefined
// console.log(message); //expected 12
// console.log(module);

// loading a modules (CommonJS) 
// const logger = require('./logger.js')
// ES6 import:
import { log } from './logger.mjs';
// console.log(logger);
// logger.log("Let's test this is loader functions")
log("this is another pattern trying to import the files")