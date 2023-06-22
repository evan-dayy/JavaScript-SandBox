// npm init --yes
const _ = require('underscore');
console.log(_.contains([1,2,3,4] ,3));

// when npm i package
// name would be add to the package.json
// and the real package will be adeed to the node_modules

// we do not need to transfer the node modules directly
// the user can use `npm i` to download the dependency

// npm list --depth=2 : to see all the list and the version
// npm view mongoose
// npm view mongoose versions: see the past version 

// downgrade or upgrade a package
// npm i mongoose@x.x.x

// npm outdated: check which package is outdated
// npm update : update the minor and patch semantic version (x.minor.patch)


// npm i -global npm-check-updates: update the latest version
// npm i

// --------------------------

// Development dependency: such as unit test, only for development
// and not for the the deployment
// npm -i jshint --save-dev


// -------------------------
// how to install the package
// npm un package


// ----------------------------
// global install 
// sudo npm i -g npm

// also global search
// npm -g outdated


// publish an package
const my = require("my-package-evan")
console.log(my.add(1, 2));
console.log(my.mul(10, 10));






