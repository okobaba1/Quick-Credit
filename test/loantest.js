import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();


describe('Loans tests', () => {
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
  it('should bring all unpaid loans ', (done) => {
    const loan = {};
    chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.data).be.a('array');
        done();
      });
  });
  it('should bring all paid loans ', (done) => {
    const loan = {};
    chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('All loans  ', (done) => {
    const loan = {};
    chai.request(app)
      .get('/api/v1/loan')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('Repayment  ', (done) => {
    const loan = {};
    chai.request(app)
      .get('/api/v1/loans/1/repayments')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('Repayment  ', (done) => {
    const loan = {};
    chai.request(app)
      .get('/api/v1/loans/30/repayments')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        done();
      });
  });
  it('Approve or reject loan  ', (done) => {
    const loan = { status: 'rejected' };
    chai.request(app)
      .patch('/api/v1/loans/2')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('Loan not found  ', (done) => {
    const loan = { status: 'rejected' };
    chai.request(app)
      .patch('/api/v1/loans/1')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        assert.equal(res.body.error, 'Loan not found');
        done();
      });
  });

  it('payment record  ', (done) => {
    const loan = { id: 1 };
    chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('record  ', (done) => {
    const loan = {};
    chai.request(app)
      .post('/api/v1/loans/93/repayment')
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        done();
      });
  });
});
