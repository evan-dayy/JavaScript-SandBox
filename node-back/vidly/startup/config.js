const config = require('config');
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local');

module.exports = function() {
    // check jwtPrivateKey
    if (!config.get("jwtPrivateKey")) {
        LocalDebugger("Cannot find jwt Private Key in local environment ...")
        throw(new Error("FATAL ERROR: jwtPrivateKey is not defined"));
    }
    LocalDebugger("Found jwt Private Key in local environment ...");
    
    if (!config.get("dbuser") || !config.get("dbpassword")) {
        LocalDebugger("Cannot find DB user, currently we are using MongoDB Atlas ...")
        throw(new Error("FATAL ERROR: DB user and password is not defined"));
    }
    LocalDebugger("Found Atlas DB user and password in local environment ...");
}