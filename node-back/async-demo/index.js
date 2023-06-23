console.log("Before");

// cannot access from here, expected undefined
// callback function
// callback hell
// getUser(1, (user) => {
//     console.log(user);
//     getRepository("name", (repos)=>{
//         console.log(repos);
//     }); 
// }); 


// flattern call back
getUser(1, userCallback); 

function userCallback(user) {
    console.log(user);
    getRepository("name", repoCallBack);
}

function repoCallBack(repos) {
    console.log(repos);
}

setTimeout(() => {
    console.log("getting the user...");
}, 5000)
setTimeout(() => {
    console.log("Reading a user from a database 1...");
}, 4000)
setTimeout(() => {
    console.log("Reading a user from a database 2...");
}, 3000)
setTimeout(() => {
    console.log("Reading a user from a database 3...");
}, 2000)
setTimeout(() => {
    console.log("Reading a user from a database 4...");
}, 1000)
setTimeout(() => {
    console.log("Loading database...");
}, 200)
console.log("After");



function getUser(id, callback) {
    setTimeout(()=> {
        console.log("Retrieving data ...");
        callback({id: id, name: "Evan Mosh"});
    }, 6000);
}

function getRepository(username, callback) {
    setTimeout(() => {
        console.log('getting the repositories...')
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}
 
/**
 * How to solve the problem above:
 * 1. Callbacks => Callbacks Hell
 * 2. Promise
 * 3. Asyn and await
 * 
 */