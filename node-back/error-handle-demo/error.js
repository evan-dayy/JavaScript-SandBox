/**
 * Several Way to achive error handling: 
 *  1. try-catch in the code itself
 *      - too many downsides, need to find where to change the code
 *      - the app server will crash if the error is not handled
 *      - the app will try to reconnect the the database for 30 times
 *  2. use a middleware function
 *      - much easier to find and handle the error
 *      - but it still need a try-catch block to pass the error to the middleware function
 * 
 *  3. move the try-catchblock outside the function and use a middleware function
 *    - try to pass the async function to another middleware function 
 *    - the middleware function will return a asnyc function
 * 
 *  4. use a npm package to handle the error **** best way, same as the approach, but without calling the middleware
 *    - npm i express-async-errors
 * 
 * 
 * Always log the error to the user:
 *  -> winston (logging to a files)
 *  -> winston has a transport (storage device) for the log
 *  -> console, http, file, database, redis, mongoDB etc.
 *  -> winston.error, .warn, .info, .verbose, .debug, .silly
 *  -> we can also put all the log in a file calling winston.add(winston.transports.File, {filename: 'logfile.log'})
 *  
 * 
 *  -> logging to the database
 *  -> require('winston-mongodb'); --depreciated
 *  winston.add(new winston.transports.MongoDB(
  {db: `mongodb: connection string`,
    options: { useUnifiedTopology: true } // server discovery and monitoring enginer use option to enable
    }));
 * 
 * however, the package cannot catch the error in index.js
 * so, how to get these uncaught exception?
 *  using the process.on('uncaughtException', (ex) => {winston.error(ex.message, ex);}) 
 *  this method is only working for synchronous code // however, it is not handled by the process
 */ 