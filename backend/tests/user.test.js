const chai = require('chai');
const app = require('../server');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const expect = chai.expect;


describe('Auth API', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/signup')
        .send({
          username: 'testuser1',
          email: 'test1@example.com',
          pwd: '123456',
        });

      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('User registered successfully');
    });
  });

  describe('POST /api/auth/signin', () => {
    beforeEach(async () => {
      const hashedPwd = await bcrypt.hash('123456', 10);
      await new User({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPwd,
      }).save();
    });

    it('should login with correct credentials', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/signin')
        .send({
          username: 'testuser',
          password: '123456',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body.user.username).to.equal('testuser');
    });
  });
});
