const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10); // async method, the higher, the more complex
    console.log(salt);
    const hashres = await bcrypt.hash('12345', salt);
    console.log((hashres));
}

run();