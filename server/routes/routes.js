import express from 'express';
import User from '../controller/user';
import Loan from '../controller/loan';
import valid from '../util/valid';

const { validator, validationHandler } = valid;

const router = express.Router();

router.post('/auth/signup', validator, validationHandler, User.createUser);
router.post('/auth/signin', User.login);
router.patch('/users/:email/verify', User.verifyUSer);
router.get('/loans/:id', Loan.specific);
router.get('/loans', Loan.unpaid);
router.get('/loans', Loan.paid);
router.get('/loan', Loan.allLoans);
router.get('/loans/:id/repayments', Loan.loanRepayment);
router.post('/loans', Loan.loanApply);
router.patch('/loans/:id', Loan.Approveloan);
router.post('/loans/:id/repayment', Loan.repaymentRecord);
router.patch('/admin/:id', User.superAdmin);

export default router;
