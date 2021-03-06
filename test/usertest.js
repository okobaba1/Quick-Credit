import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
// import db from '../server/database/dbconnection';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();

// users sign up tests
describe('User', () => {
  const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtb3NAZW1haWwuY29tIiwiaWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTU1ODM4NjQ5OSwiZXhwIjoxNTU5MDA1Njk5fQ.27dhMetylbPDmbzyqbmnvvMdv6UfIg36R32ckFAZP-M';
  it('should sign up a user', (done) => {
    const user = {
      email: 'victor@gmail.com',
      firstName: 'moke',
      lastName: 'ilo',
      password: '1234hdgdpds',
      address: 'Lagos house',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        expect(res.body.data).be.an('object');
        assert.equal(res.body.status, 201);
        done();
      });
  });
  it('User already exists', (done) => {
    const user = {
      email: 'victor@gmail.com',
      firstName: 'moke',
      lastName: 'ilo',
      password: '1234hdgdpds',
      address: '12 wer',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        expect(res.body.error).be.an('string');
        assert.equal(res.body.status, 409);
        assert.equal(res.body.error, 'User already exists');
        done();
      });
  });

  // User login tests
  it('User Login', (done) => {
    const user = {
      email: 'victor@gmail.com',
      password: '1234hdgdpds',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        expect(res.body.data).be.an('object');
        assert.equal(res.body.status, 200);
        assert.equal(res.body.message, 'login successsful');
        done();
      });
  });
  it('Not signed up', (done) => {
    const user = {
      email: 'ab@gmail.com',
      password: '1234hsvsz',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error, 'Please sign Up');
        done();
      });
  });
  it('Empty email or password input', (done) => {
    const user = {
      email: '',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error, 'kindly put in your email and password');
        done();
      });
  });

  it('Verify user', (done) => {
    const user = {};
    chai.request(app)
      .patch('/api/v1/users/victor@gmail.com/verify')
      .set('x-access-token', token1)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        done();
      });
  });
  it('Verify user', (done) => {
    const user = {};
    chai.request(app)
      .patch('/api/v1/users/amogshss@email.com/verify')
      .set('x-access-token', token1)
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        assert.equal(res.body.error, 'Not a registered email');
        done();
      });
  });

  it('Verify user', (done) => {
    const user = {};
    chai.request(app)
      .patch('/api/v1/users/victor@gmail.com/verify')
      .set('x-access-token', token1)
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        assert.equal(res.body.error, 'User is already verified');
        done();
      });
  });

  //   it('Super Admin success', (done) => {
  //     chai.request(app)
  //       .patch('/api/v1/admin/2')
  //       .set('x-access-token', token1)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         expect(res.body).be.an('object');
  //         expect(res.body.status).be.a('number');
  //         done();
  //       });
  //   });

//   it('Super Admin failed', (done) => {
//     const user = {};
//     chai.request(app)
//       .patch('/api/v1/admin/29')
//       .set('x-access-token', token1)
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(401);
//         expect(res.body).be.an('object');
//         done();
//       });
//   });
});
