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
};


export default Loans;
