// promise that already resolved
const p = Promise.resolve({id: 1});
p.then((res) => console.log(res));

// promise that alrady rejected
const pj = Promise.reject(new Error("Reasone why rejects"));
pj.catch((err) => console.log(err.message));


// parallel runing different async task
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Asyn Operation-1 .....");
        resolve({name: 'evan', id : 10});

        // reject(new Error("Async Operation-1 failed."))
    }, 2000);
})


const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Asyn Operation-2 .....");
        resolve({name: 'rose', id : 10});
        // reject(new Error("Async Operation-2 failed."))
    }, 5000);
})

// this is not multi-threading
// it is only because p1 and p2 are kickedoff at almost the same time
Promise.all([p1, p2])
    .then((res) => console.log(res))
    .catch(err => {console.log(err.message)})
    .finally(() => console.log("Ends...."))



Promise.race([p1, p2])
    .then((res) => console.log(res))
    .catch(err => {console.log(err.message)})
    .finally(() => console.log("Ends...."))
