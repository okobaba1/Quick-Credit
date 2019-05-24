import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
should();


describe('Loans tests', () => {
  const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtb3NAZW1haWwuY29tIiwiaWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTU1ODM4NjQ5OSwiZXhwIjoxNTU5MDA1Njk5fQ.27dhMetylbPDmbzyqbmnvvMdv6UfIg36R32ckFAZP-M';
  const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyYWNrdGFtb3NAZW1haWwuY29tIiwiaWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NTgzODcwNDEsImV4cCI6MTU1OTAwNjI0MX0.3X_Ua6w11xR4ziv3gR9e1mAbtY0C_l2d9Y7MD5Eu9ws';
  it('Apply loan  ', (done) => {
    const loan = {
      email: 'okobaba@gmail.com',
      amount: 5000,
      tenor: 12,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token2)
      .send(loan)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('Apply loan  ', (done) => {
    const loan = {
      email: 'okobaba@email.com',
      amount: 5000,
      tenor: 16,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token2)
      .send(loan)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        done();
      });
  });
  it('should bring specific loan ', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1')
      .set('x-access-token', token1)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('number');
        done();
      });
  });
  it('should bring specific loan ', (done) => {
    chai.request(app)
      .get('/api/v1/loans/133')
      .set('x-access-token', token1)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        assert.equal(res.body.error, 'Not a loan application');
        done();
      });
  });
  it('Approve or reject loan  ', (done) => {
    const loan = { status: 'rejected' };
    chai.request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', token1)
      .send(loan)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        done();
      });
  });

  it('Approve or reject loan  ', (done) => {
    const loan = { status: 'rejected' };
    chai.request(app)
      .patch('/api/v1/loans/50')
      .set('x-access-token', token1)
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        done();
      });
  });
  // it('should bring all unpaid loans ', (done) => {
  //   const loan = {};
  //   chai.request(app)
  //     .get('/api/v1/loans?status=approved&repaid=false')
  //     .set('x-access-token', token1)
  //     .send(loan)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });
  // it('should bring all paid loans ', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/loans?status=approved&repaid=true')
  //     .set('x-access-token', token1)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });

  // it('All loans  ', (done) => {
  //   const loan = {};
  //   chai.request(app)
  //     .get('/api/v1/loan')
  //     .set('x-access-token', token1)
  //     .send(loan)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });

  // it('Repayment  ', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/loans/1/repayments')
  //     .set('x-access-token', token1)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });

  // it('Repayment  ', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/loans/30/repayments')
  //     .set('x-access-token', token1)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });


  // it('Loan not found  ', (done) => {
  //   const loan = { status: 'rejected' };
  //   chai.request(app)
  //     .patch('/api/v1/loans/1')
  //     .set('x-access-token', token1)
  //     .send(loan)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       expect(res.body).be.an('object');
  //       done();
  //     });
  // });

  it('payment record  ', (done) => {
    const loan = { id: 1 };
    chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', token1)
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
      .set('x-access-token', token1)
      .send(loan)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).be.an('object');
        done();
      });
  });


  it('App should exists', () => {
    chai.request(app);
    expect(app).to.be.a('function');
  });
});
