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
 */