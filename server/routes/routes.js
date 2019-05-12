import express from 'express';
import User from '../controller/user';
import Loan from '../controller/loan';

const router = express.Router();

router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.login);
router.patch('/users/:email/verify', User.verifyUSer);
router.get('/loans/:id', Loan.specific);
router.get('/loans', Loan.unpaid);
router.get('/loans', Loan.paid);
router.get('/loan', Loan.allLoans);
router.get('/loans/:id/repayments', Loan.loanRepayment);
router.post('/loans', Loan.loanApply);

export default router;
