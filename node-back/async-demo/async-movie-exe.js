function getCustomers(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usr = {id: id, name: 'Mosh', isGold: false, email: 'mosh@gmail.com'};
            console.log(`Loading the customers information ...: ${usr}`);
            resolve(usr);
        }, 4000)
    }); 
}

function getTopMovies(customer) {
    return new Promise((resolve, reject) => {
        if (!customer.isGold) {
            reject(new Error(`${customer.name} is not a Golden member`));
            // stop immediately
            return;
        }

        setTimeout(() => {
            const movies = ['moive1', 'movie2', '...'];
            console.log(`Retrieving ${customer.name}'s top moives...: ${movies.toString()}`);
            resolve(movies);
        }, 2000);
    });
}

function sentEmail(customer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Email sending to ${customer.email}`);
            resolve("Email sent~");
        }, 2000);
    });
}

async function usersTopMovie(id) {
    try {
        usr = await getCustomers(id);
        movies = await getTopMovies(usr);
        respond = await sentEmail(usr);
        console.log(respond);
    } catch(e) {
        console.log(e.message);
    }

}

usersTopMovie(1);