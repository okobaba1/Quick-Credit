import express from 'express';
import Users from '../controller/users';
import Loan from '../controller/loan';
import valid from '../middleware/valid';
import { verifyUser, verifyAdmin, verifySuperAdmin } from '../middleware/jwt';

const { validator, validationHandler, applyForLoan } = valid;
// const { verifyUs } = verifyUSer;

const router = express.Router();

router.post('/auth/signup', validator, validationHandler, Users.create);
router.post('/auth/signin', Users.login);
// router.patch('/users/:email/verify', verifyAdmin, Users.verifyUSer);
// router.get('/loans/:id', verifyAdmin, Loan.specific);
// router.get('/loans', verifyAdmin, Loan.viewLoans);
// router.get('/loans/:id/repayments', Loan.loanRepayment);
// router.post('/loans', applyForLoan, validationHandler, verifyUser, Loan.loanApply);
// router.patch('/loans/:id', verifyAdmin, Loan.Approveloan);
// router.post('/loans/:id/repayment', verifyAdmin, Loan.repaymentRecord);
// router.patch('/admin/:id', verifySuperAdmin, Users.superAdmin);

export default router;
