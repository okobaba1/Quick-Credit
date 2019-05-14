"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controller/user"));

var _loan = _interopRequireDefault(require("../controller/loan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/auth/signup', _user["default"].createUser);
router.post('/auth/signin', _user["default"].login);
router.patch('/users/:email/verify', _user["default"].verifyUSer);
router.get('/loans/:id', _loan["default"].specific);
router.get('/loans', _loan["default"].unpaid);
router.get('/loans', _loan["default"].paid);
router.get('/loan', _loan["default"].allLoans);
router.get('/loans/:id/repayments', _loan["default"].loanRepayment);
router.post('/loans', _loan["default"].loanApply);
router.patch('/loans/:id', _loan["default"].Approveloan);
var _default = router;
exports["default"] = _default;