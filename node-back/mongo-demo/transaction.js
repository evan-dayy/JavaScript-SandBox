const db = require('mongoose');
db.connect("mongodb://localhost:27017/transanction") 
    .then(() => console.log("Connected to MongoDB...."))
    .catch((err) =>  console.log("Cannot connected to it", err));
const Customer = db.model('Customer', new db.Schema({ name: String }));

// async function createCustomer(name) {
//     const result = await new Customer({name : name}).save();
//     console.log(result);
// }
// createCustomer("Yichao");

let session = null;
return Customer.createCollection().
  then(() => db.startSession()).
  then(_session => {
    session = _session;
    // Start a transaction
    session.startTransaction();
    // This `create()` is part of the transaction because of the `session`
    // option.
    return Customer.create([{ name: 'Test' }], { session: session });
  }).
  // Transactions execute in isolation, so unless you pass a `session`
  // to `findOne()` you won't see the document until the transaction
  // is committed.
  then(() => Customer.findOne({ name: 'Test' })).
  then(doc => assert.ok(!doc)).
  // This `findOne()` will return the doc, because passing the `session`
  // means this `findOne()` will run as part of the transaction.
  then(() => Customer.findOne({ name: 'Test' }).session(session)).
  then(doc => assert.ok(doc)).
  // Once the transaction is committed, the write operation becomes
  // visible outside of the transaction.
  then(() => session.commitTransaction()).
  then(() => Customer.findOne({ name: 'Test' })).
  then(doc => assert.ok(doc)).
  then(() => session.endSession());