import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();

// users sign up tests
describe('Post user', () => {
  it('should sign up a user', (done) => {
    const user = {
      email: 'abcd@gmail.com',
      firstName: 'moke',
      lastName: 'ilo',
      password: '1234',
      address: '12 wer',
      status: 'unverified',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.data).be.an('object');
        assert.equal(res.body.status, 'Success');
        done();
      });
  });
  it('User already exists', (done) => {
    const user = {
      email: 'abcd@gmail.com',
      firstName: 'moke',
      lastName: 'ilo',
      password: '1234',
      address: '12 wer',
      status: 'unverified',
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
  it('returns a bad request', (done) => {
    const user = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      address: '',
      status: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'Fail');
        assert.equal(res.body.message, 'All fields are required');
        done();
      });
  });

  // User login tests
  it('User Login', (done) => {
    const user = {
      email: 'abcd@gmail.com',
      password: '1234',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        expect(res.body.data).be.an('object');
        expect(res.body.data.firstName).be.a('string');
        expect(res.body.data.lastName).be.a('string');
        assert.equal(res.body.status, 200);
        assert.equal(res.body.data.message, 'login successsful');
        done();
      });
  });
  it('Incorrect Username/Password', (done) => {
    const user = {
      email: 'ab@gmail.com',
      password: '1234',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        assert.equal(res.body.status, 404);
        assert.equal(res.body.error, 'email/password is incorrect');
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
        assert.equal(res.body.message, 'kindly put in your email and password');
        done();
      });
  });
});
