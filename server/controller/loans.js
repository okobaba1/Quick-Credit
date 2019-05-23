import jwt from 'jsonwebtoken';
import moment from 'moment';
// import uuid from 'uuid';
import bcrypt from 'bcrypt';
import db from '../database/dbconnection';

const Loans = {
  async specific(req, res) {
    const { id } = req.params;
    const checkLoan = {
      text: 'SELECT * FROM loans WHERE id = $1',
      values: [id],
    };
    try {
      const { rows } = await db.query(checkLoan);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not a loan application',
        });
      } return res.status(200).json({
        status: 200,
        data: {
          id,
          user: rows[0].user,
          createdOn: rows[0].createdOn,
          status: rows[0].status,
          repaid: rows[0].repaid,
          tenor: rows[0].tenor,
          amount: rows[0].amount,
          paymentInstallment: rows[0].paymentInstallment,
          balance: rows[0].balance,
          interest: rows[0].interest,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },

  async viewLoans(req, res) {
    const { status, repaid } = req.query;
    const checkUser = {
      text: 'SELECT * FROM users WHERE status = $1 AND repaid = $2',
      values: [status, repaid],
    };
    const getLoans = { text: 'SELECT * FROM loans' };
    try {
      const { rows } = await db.query(checkUser);
      const { rows: allLoans } = await db.query(getLoans);

      if (!status && !repaid) {
        return res.status(200).json({
          status: 200,
          data: allLoans,
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request',
      });
    }
  },

  async repaymentHistory(req, res) {
    const { loanid } = req.params;
    const checkLoan = {
      text: 'SELECT * FROM repayments WHERE loanid = $1',
      values: [loanid],
    };
    try {
      const { rows } = await db.query(checkLoan);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not a Loan Application',
        });
      } return res.status(200).json({
        status: 200,
        data: {
          loanid: rows[0].loanid,
          createdOn: rows[0].createdOn,
          monthlyInstallment: rows[0].monthlyInstallment,
          amount: rows[0].amount,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'invalid request',
      });
    }
  },

  async createLoan(req, res) {
    const { email, amount, tenor } = req.body;
    if (tenor < 1 || tenor > 12) {
      return res.status(400).json({
        status: 400,
        error: 'Tenor should be from 1 to 12',
      });
    }
    const checkUser = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    const checkLoan = {
      text: 'SELECT * FROM loans WHERE email = $1',
      values: [email],
    };


    try {
      const { rows } = await db.query(checkUser);
      if (!rows[0] || !rows[0].status === 'verified') {
        return res.status(400).json({
          status: 400,
          error: 'Account status is not verified yet, try again later',
        });
      }
      const { rows: rowsCheck } = await db.query(checkLoan);

      if (rowsCheck[0] && rowsCheck[0].balance > 0) {
        return res.status(401).json({
          status: 401,
          error: 'Pay up your debt',
        });
      }
      const createdOn = moment().toDate();
      const interest = (0.05 * Number(amount));
      const paymentInstallment = ((amount + interest) / tenor).toFixed(2);
      const balance = amount;

      const createQuery = {
        text: 'INSERT INTO loans(email, createdOn, tenor, amount, paymentInstallment, balance, interest) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [email, createdOn, tenor, amount, paymentInstallment, balance, interest],
      };

      const { rows: create } = await db.query(createQuery);
      return res.status(201).json({
        status: 201,
        data: {
          loanId: create[0].id,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          email,
          tenor,
          amount,
          paymentInstallment: create[0].paymentInstallment,
          status: create[0].status,
          balance: create[0].balance,
          interest: create[0].interest,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },
  async approve(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const checkLoan = {
      text: 'SELECT * FROM loans WHERE id = $1',
      values: [id],
    };
    const update = {
      text: 'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *',
      values: [status, id],
    };
    try {
      const { rows } = await db.query(checkLoan);
      if (rows[0] && rows[0].status === 'pending') {
        const { rows: updateStatus } = await db.query(update);
        return res.status(201).json({
          status: 201,
          data: {
            loanId: id,
            loanAmount: updateStatus[0].amount,
            tenor: updateStatus[0].tenor,
            status: updateStatus[0].status,
            monthlyInstallment: updateStatus[0].monthlyInstallment,
            interest: updateStatus[0].interest,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Loan not found',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },
  async createRepayment(req, res) {
    const { id } = req.params;
    const checkLoan = {
      text: 'SELECT * FROM loans WHERE id = $1',
      values: [id],
    };


    try {
      const { rows } = await db.query(checkLoan);
      if (rows[0]) {
        const loanId = id;
        const {
          amount,
          paymentInstallment,
          balance,
        } = rows[0];
        const paidAmount = amount - balance;

        const createQuery = {
          text: 'INSERT INTO repayments(loanId, amount) VALUES($1, $2) RETURNING *',
          values: [loanId, paidAmount],
        };
        const { rows: add } = await db.query(createQuery);
        return res.status(201).json({
          status: 201,
          data: {
            id: add[0].id,
            loanId,
            createdOn: add[0].createdOn,
            amount,
            monthlyInstallment: paymentInstallment,
            paidAmount,
            balance,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No loans found',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },

};


export default Loans;
