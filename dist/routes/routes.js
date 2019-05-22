"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controller/users"));

var _loan = _interopRequireDefault(require("../controller/loan"));

var _valid = _interopRequireDefault(require("../middleware/valid"));

var _jwt = require("../middleware/jwt");

var validator = _valid["default"].validator,
    validationHandler = _valid["default"].validationHandler,
    applyForLoan = _valid["default"].applyForLoan; // const { verifyUs } = verifyUSer;

var router = _express["default"].Router();

router.post('/auth/signup', validator, validationHandler, _users["default"].create);
router.post('/auth/signin', _users["default"].login);
router.patch('/users/:email/verify', _jwt.verifyAdmin, _users["default"].verify); // router.get('/loans/:id', verifyAdmin, Loan.specific);
// router.get('/loans', verifyAdmin, Loan.viewLoans);
// router.get('/loans/:id/repayments', Loan.loanRepayment);
// router.post('/loans', applyForLoan, validationHandler, verifyUser, Loan.loanApply);
// router.patch('/loans/:id', verifyAdmin, Loan.Approveloan);
// router.post('/loans/:id/repayment', verifyAdmin, Loan.repaymentRecord);
// router.patch('/admin/:id', verifySuperAdmin, Users.superAdmin);

var _default = router;
exports["default"] = _default;