var url = 'http://logger.io/mylog'

export function log(message) {
    // send an http request
    console.log(message + url);
}

// commonJS Modules
// module.exports.log = log;
// module.exports.endPoint = url; // however, it should be implementation detail
// console.log(module);

