console.log("Before");
const p = new Promise(function(resolve, reject) {
    // kick off some async work
    // ...
    setTimeout(() => {
        // resolve(1); // pending => fullfilled / resolved
        reject(new Error("rejecting message")); // pending => rejected
    }, 2000)
});
console.log("After");


p
    .then(result => console.log(result))
    .catch(err => console.log(err.message));


// anywhere we get a async function that take a callback, modify it to a promise

