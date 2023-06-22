// there is always module wrapper function for each file
/**
 * function (require, exports, module, __fileName, __dirName) {
 *      contents in this files ....
 * }
 */


var url = 'http://logger.io/mylog'

const EventEmitter = require('events'); // a class
// const emitter = new EventEmitter(); // an object

class Logger extends EventEmitter{
    log(message) {
        // send an http request
        console.log(message + " " + url);
        // emit an event
        this.emit('messageLogged', { id: 1, url: "https://" }) // raise an event
    }
}


// commonJS Modules
module.exports = Logger;
// module.exports.endPoint = url; // however, it should be implementation detail
console.log(module);

