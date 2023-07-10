const winston = require("winston");
const mongoose = require('mongoose');
const config = require('config');
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local'); 

module.exports = function() {
    mongoose.connect(config.get("dbserver") 
                        + config.get("dbuser") 
                        + config.get("dbpassword") 
                        + config.get("dbconnection"))
    .then(() => {
        // throw(new Error("FATAL ERROR: DB user and password is not defined"));
        DatabaseDebugger(`Connected to MongoDB at ${config.get("dbconnection")}...`);
        winston.info('Connected to MongoDB...');
        
    })
    .catch(err => {
        DatabaseDebugger('Could not connect to MongoDB...');
        throw(err); // handled the error ny winston
        // winston.error('Could not connect to MongoDB...')
    });
}