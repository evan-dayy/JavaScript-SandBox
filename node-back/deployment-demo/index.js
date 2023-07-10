// several packages related to the deployment
/**
 * @helmet middleware function to set the various HTTP headers related to security
 * @compression  compares the size of the response body to users
 *
 * prod.js in start up module
 * 
 * in the package.json file, we have to add the following:
 * "start": "NODE_ENV=production node index.js"
 * "engines": {node version}
 * 
 * 
 * 1. heroku create [vidly]
 * 2. heroku config:set [key=value]
 * 3. git push heroku master
 */