const db = require('mongoose');
const assert = require('assert');
const { log } = require('console');
db.connect("mongodb+srv://evan-dayy01:dyc991201@cluster0.ut9kpub.mongodb.net/?retryWrites=true&w=majority") 
    .then(() => console.log("Connected to MongoDB...."))
    .catch((err) =>  console.log("Cannot connected to it", err));
const Customer = db.model('Customer', new db.Schema({ name: String }));

let session = null;


  Customer.createCollection().
  then(() => db.startSession()).
  then(async (_session) => {
    session = _session;
    try {
      await session.withTransaction(async () => {
        const customer = new Customer({name: "Test6"});
        await customer.save({ session: session });
        throw new Error("Test");
      });
    } catch (error) {
      console.log("----------------------");
    }
  }).
  then(() => session.endSession());



// return Customer.createCollection().
//   then(() => db.startSession()).
//   then(_session => {
//     session = _session;
//     // Start a transaction
//     session.startTransaction();
//     // This `create()` is part of the transaction because of the `session`
//     // option.
//     // return Customer.create([{ name: 'Test' }], { session: session });
//     const customer = new Customer({name: "Test"});
//     return customer.save({ session: session });
//   }).
//   // Transactions execute in isolation, so unless you pass a `session`
//   // to `findOne()` you won't see the document until the transaction
//   // is committed.
//   then(() => Customer.find({ name: 'Test' }).session(session)).
//   then(doc => {
//       console.log(doc);
//       assert.ok(doc)
//     }).
//   then(() => Customer.find({ name: 'Test' })).
//   then(doc => {
//       console.log(doc);
//       assert.ok(!doc)
//     }).
//   // This `findOne()` will return the doc, because passing the `session`
//   // means this `findOne()` will run as part of the transaction.
  
//   // Once the transaction is committed, the write operation becomes
//   // visible outside of the transaction.
//   then(() => session.commitTransaction()).
//   then(() => Customer.findOne({ name: 'Test' })).
//   then(doc => assert.ok(doc)).
//   then(() => session.endSession());