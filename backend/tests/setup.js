const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
global.chai = chai;
global.expect = chai.expect;

let mongod;

module.exports = {
  mochaHooks: {
    async beforeAll() {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to in-memory MongoDB');
    },
    async afterAll() {
      await mongoose.disconnect();
      await mongod.stop();
      console.log('🔌 In-memory MongoDB stopped');
    },
  },
};
