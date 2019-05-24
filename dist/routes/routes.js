"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controller/users"));

var _loans = _interopRequireDefault(require("../controller/loans"));

var _valid = _interopRequireDefault(require("../middleware/valid"));

var _jwt = require("../middleware/jwt");

var validator = _valid["default"].validator,
    validationHandler = _valid["default"].validationHandler,
    applyForLoan = _valid["default"].applyForLoan; // const { verifyUs } = verifyUSer;

var router = _express["default"].Router();

router.post('/auth/signup', validator, validationHandler, _users["default"].create);
router.post('/auth/signin', _users["default"].login);
router.patch('/users/:email/verify', _jwt.verifyAdmin, _users["default"].verify);
router.get('/loans/:id', _jwt.verifyAdmin, _loans["default"].specific);
router.get('/loans', _jwt.verifyAdmin, _loans["default"].viewLoans);
router.get('/loans/:id/repayments', _loans["default"].repaymentHistory);
router.post('/loans', applyForLoan, validationHandler, _jwt.verifyUser, _loans["default"].createLoan);
router.patch('/loans/:id', _jwt.verifyAdmin, _loans["default"].approve);
router.post('/loans/:id/repayment', _jwt.verifyAdmin, _loans["default"].createRepayment); // router.patch('/admin/:id', verifySuperAdmin, Users.superAdmin);

var _default = router;
exports["default"] = _default;