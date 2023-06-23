
// console.log("Before");

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
// getUser(1, userCallback); 

// function userCallback(user) {
//     console.log(user);
//     getRepository("name", repoCallBack);
// }

// function repoCallBack(repos) {
//     console.log(repos);
// }

// setTimeout(() => {
//     console.log("getting the user...");
// }, 5000)
// setTimeout(() => {
//     console.log("Reading a user from a database 1...");
// }, 4000)
// setTimeout(() => {
//     console.log("Reading a user from a database 2...");
// }, 3000)
// setTimeout(() => {
//     console.log("Reading a user from a database 3...");
// }, 2000)
// setTimeout(() => {
//     console.log("Reading a user from a database 4...");
// }, 1000)
// setTimeout(() => {
//     console.log("Loading database...");
// }, 200)
// console.log("After");



// function getUser(id, callback) {
//     setTimeout(()=> {
//         console.log("Retrieving data ...");
//         callback({id: id, name: "Evan Mosh"});
//     }, 6000);
// }

// function getRepository(username, callback) {
//     setTimeout(() => {
//         console.log('getting the repositories...')
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 1000);
// }
 
/**
 * How to solve the problem above:
 * 1. Callbacks => Callbacks Hell ^
 * 2. Promise >
 * 3. Asyn and await
 * 
 */

// promise

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("retrieving the user data ...");
            resolve({ id: id, name: 'mosh' });
        }, 2000);
    })
}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`retriving the repos from ${username}...`);
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error("Here is a error, cannot get repo"))
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`retriving the commits from ${repo}...`)
            resolve(['commits']);
        }, 2000);
    });
}


// how to consume the commits;
// getUser(1)
//     .then((user) => getRepository(user.name))
//     .then((repos) => getCommits(repos[0]))
//     .then((commits) => console.log(commits))
//     .catch((err) => console.log(err.message)); // error handler


console.log("=======================================")

// async and await => looking like a sync code
async function displayCommit() {
    // however, it does not catch the error
    // use try catch block
    try {
        const usr  = await getUser(1);
        const repos = await getRepository(usr.name);
        const commit = await getCommits(repos[0]);
        console.log(commit);
    } catch (e) {
        console.log(e.message);
    }
}

displayCommit();




