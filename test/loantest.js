import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();


describe('Get Loan', () => {
  it('should bring specific loan ', (done) => {
    const loan = {
      id: 1,
      user: 'abcd@gmail.com',
      created: '24/07',
      status: 'approved',
      repaid: false,
      tenor: 28000,
      amount: 168000,
      paymentInstallment: 7362,
      balance: 62733,
      interest: 5262,
    };
    chai.request(app)
      .get('/api/v1/loans/1')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        expect(res.body.data).be.an('object');
        done();
      });
  });
  it('should bring specific loan ', (done) => {
    const loan = {
      id: 1,
      user: 'abcd@gmail.com',
      created: '24/07',
      status: 'approved',
      repaid: false,
      tenor: 28000,
      amount: 168000,
      paymentInstallment: 7362,
      balance: 62733,
      interest: 5262,
    };
    chai.request(app)
      .get('/api/v1/loans/133')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        expect(res.body.error).be.a('string');
        assert.equal(res.body.error, 'Not a loan application');
        done();
      });
  });
});
