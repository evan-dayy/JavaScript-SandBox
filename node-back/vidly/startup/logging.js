const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');


module.exports = function() {
    // handle uncaught exceptions, typically happened when a program is started up
    winston.exceptions.handle(
        new winston.transports.File({filename: 'uncaughtException.log'}),
        new winston.transports.Console({})
            ); 
    // handle the exception during the programming process
    winston.add(new winston.transports.File({filename: 'logfile.log'})); // put the error in a log file
    winston.add(new winston.transports.MongoDB(
        {db: `${config.get("dbserver")}${config.get("dbuser")}${config.get("dbpassword")}${config.get("dbconnection")}`,
        options: { useUnifiedTopology: true }, // server discovery and monitoring enginer use option to enable
        level: 'error'
        // level : error, warn, info, verbose, debug, silly can be choses
      }));
}