const chai = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/user');
const Note = require('../models/note');
const expect = chai.expect;

describe('Notes API Integration (protected routes)', () => {
  let validToken;
  let testUser;
  let noteId;

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

  it('should create a new note when token is valid', done => {
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
        expect(res.body.subject).to.equal('Test Note');
        noteId = res.body._id;
        done();
      });
  });

  it('should update the note', done => {
    chai.request(app)
      .put('/api/note/update')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        note_id: noteId,
        subject: 'Updated Title',
        note: '<p>Updated content</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id', noteId);
        expect(res.body.subject).to.equal('Updated Title');
        expect(res.body.note).to.include('Updated content');
        done();
      });
  });

  it('should search notes by keyword', done => {
    chai.request(app)
      .get('/api/note/search')
      .set('Authorization', `Bearer ${validToken}`)
      .query({ query: 'Updated' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        const found = res.body.find(n => n._id === noteId);
        expect(found).to.exist;
        expect(found.subject).to.include('Updated');
        done();
      });
  });

  it('should read notes for the user', done => {
    chai.request(app)
      .get('/api/note/read')
      .set('Authorization', `Bearer ${validToken}`)
      .query({ user: testUser._id })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('count').that.is.a('number');
        expect(res.body).to.have.property('notes').that.is.an('array');
        done();
      });
  });

  it('should delete a note when noteId is provided and token is valid', done => {
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
