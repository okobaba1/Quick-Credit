import chai from 'chai';
import chaiHttp from 'chai-http';
import { getMaxListeners } from 'cluster';
import app from '../server/app';
import users from '../server/controller/user';
// import { it } from 'mocha';

// const assert = chai.assert();
const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();
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
    // expect(true).to.equal(true);
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
    // expect(true).to.equal(true);
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
    // expect(true).to.equal(true);
  });
});
