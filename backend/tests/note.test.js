// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');
// const app = require('../server');
// const { connectMemoryDB, closeMemoryDB } = require('./setup');

// const expect = chai.expect;
// console.log('typeof chaiHttp:', typeof chaiHttp); 
// console.log('chaiHttp:', chaiHttp); 
// chai.use(chaiHttp.default);




// describe('POST /api/note/create (protected)', () => {
//   before(async () => {
//     await connectMemoryDB(); 
//   });

//   after(async () => {
//     await closeMemoryDB();
//   });

//   it('should create a new note when token is valid', (done) => {
//     const token = jwt.sign(
//       { id: '123abc' },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
   
//     chai.request(app)
//       .post('/api/note/create')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         username: 'testuser',
//         title: 'Test Note',
//         note: '<p>Hello from test</p>',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message', 'Note saved');
//         done();
//       });
//   });

//   it('should not create a note with invalid token', (done) => {
//     const token = jwt.sign(
//       { id: '12345' },
//       'wrongsecretkey', 
//       { expiresIn: '1d' }
//     );

//     chai.Request(app)
//       .post('/api/note/create')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         username: 'testuser',
//         title: 'Test Note',
//         note: '<p>Hello from test</p>',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('message').that.includes('Invalid token');
//         done();
//       });
//   });

//   it('should not create a note without token', (done) => {
//     chai.Request(app)
//       .post('/api/note/create')
     
//       .send({
//         username: 'testuser',
//         title: 'Test Note',
//         note: '<p>Hello from test</p>',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('message').that.includes('Access denied');
//         done();
//       });
//   });
// });
