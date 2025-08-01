const chai = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/user');
const Note = require('../models/note');
const expect = chai.expect;

describe('note test cases', () => {
  let validToken, testUser, noteId;

  before(async () => {
    testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password'
    });
    validToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  });

  it('should create a new note when token is valid', (done) => {
    chai.request(app)
      .post('/api/note/create')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        username: 'testuser',
        title: 'Test Note',
        note: '<p>Hello from test</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        noteId = res.body._id;
        done();
      });
  });

  describe('DELETE /api/note/remove', () => {
    before(async () => {
      
      if (!noteId) {
        const newNote = await Note.create({
          title: 'Will be deleted',
          note: '<p>Sample</p>',
          user: testUser._id,
          subject: 'Will be deleted',
          position: 1
        });
        noteId = newNote._id;
      }
    });

    it('should delete a note when noteId is provided and token is valid', (done) => {
      chai.request(app)
        .delete('/api/note/remove')
        .set('Authorization', `Bearer ${validToken}`)
        .query({ note_id: noteId })  
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Note has been deleted');
          done();
        });
    });
  });

describe('GET /api/note/remove', () => {
    before(async () => {
      
      if (!noteId) {
        const newNote = await Note.create({
          title: 'Will be read',
          note: '<p>Sample</p>',
          user: testUser._id,
          subject: 'read',
          position: 1
        });
        noteId = newNote._id;
      }
    });

    it('should read notes when token is valid', (done) => {
      chai.request(app)
        .get('/api/note/read')
        .set('Authorization', `Bearer ${validToken}`)
        .query({ user: testUser._id })  
        .end((err, res) => {
          expect(res).to.have.status(200);
       
          done();
        });
    });
  });

});
