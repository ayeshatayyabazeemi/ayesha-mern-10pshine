// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongo;

// async function connectMemoryDB() {
//   mongo = await MongoMemoryServer.create();
//   const uri = mongo.getUri();
//   await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// }

// async function closeMemoryDB() {
//   await mongoose.disconnect();
//   await mongo.stop();
// }

// module.exports = { connectMemoryDB, closeMemoryDB };
