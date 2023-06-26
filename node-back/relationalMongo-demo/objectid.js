// 12 bytes
// 4 bytes for timestamp
// 3 bytes for machine identifier
// 2 bytes for process identifier
// 3 bytes for counter: 

// The reason why mongoDB is scalable is because that
// the database does it take charge in objectID
// the driver (mongoose -> driver -> mongodb) take charge in it and talk to
// MongoDB, that is why we do not need to wait mongoDB to 
// process the ID, that is why it is scalable

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid(id));
