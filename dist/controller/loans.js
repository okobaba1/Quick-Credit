"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dbconnection = _interopRequireDefault(require("../database/dbconnection"));

// import uuid from 'uuid';
var Loans = {
  specific: function () {
    var _specific = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var id, checkLoan, _ref, rows;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.params.id;
              checkLoan = {
                text: 'SELECT * FROM loans WHERE id = $1',
                values: [id]
              };
              _context.prev = 2;
              _context.next = 5;
              return _dbconnection["default"].query(checkLoan);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Not a loan application'
              }));

            case 9:
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: {
                  id: id,
                  user: rows[0].user,
                  createdOn: rows[0].createdOn,
                  status: rows[0].status,
                  repaid: rows[0].repaid,
                  tenor: rows[0].tenor,
                  amount: rows[0].amount,
                  paymentInstallment: rows[0].paymentInstallment,
                  balance: rows[0].balance,
                  interest: rows[0].interest
                }
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context.t0.message)
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 12]]);
    }));

    function specific(_x, _x2) {
      return _specific.apply(this, arguments);
    }

    return specific;
  }(),
  viewLoans: function () {
    var _viewLoans = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var _req$query, status, repaid, checkUser, getLoans, _ref2, rows, _ref3, allLoans;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$query = req.query, status = _req$query.status, repaid = _req$query.repaid;
              checkUser = {
                text: 'SELECT * FROM users WHERE status = $1 AND repaid = $2',
                values: [status, repaid]
              };
              getLoans = {
                text: 'SELECT * FROM loans'
              };
              _context2.prev = 3;
              _context2.next = 6;
              return _dbconnection["default"].query(checkUser);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              _context2.next = 10;
              return _dbconnection["default"].query(getLoans);

            case 10:
              _ref3 = _context2.sent;
              allLoans = _ref3.rows;

              if (!(!status && !repaid)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: allLoans
              }));

            case 14:
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                error: 'Invalid request'
              }));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 17]]);
    }));

    function viewLoans(_x3, _x4) {
      return _viewLoans.apply(this, arguments);
    }

    return viewLoans;
  }(),
  repaymentHistory: function () {
    var _repaymentHistory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var loanid, checkLoan, _ref4, rows;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              loanid = req.params.loanid;
              checkLoan = {
                text: 'SELECT * FROM repayments WHERE loanid = $1',
                values: [loanid]
              };
              _context3.prev = 2;
              _context3.next = 5;
              return _dbconnection["default"].query(checkLoan);

            case 5:
              _ref4 = _context3.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Not a Loan Application'
              }));

            case 9:
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: {
                  loanid: rows[0].loanid,
                  createdOn: rows[0].createdOn,
                  monthlyInstallment: rows[0].monthlyInstallment,
                  amount: rows[0].amount
                }
              }));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                error: 'invalid request'
              }));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 12]]);
    }));

    function repaymentHistory(_x5, _x6) {
      return _repaymentHistory.apply(this, arguments);
    }

    return repaymentHistory;
  }(),
  createLoan: function () {
    var _createLoan = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      var _req$body, email, amount, tenor, checkUser, checkLoan, _ref5, rows, _ref6, rowsCheck, createdOn, interest, paymentInstallment, balance, createQuery, _ref7, create;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, amount = _req$body.amount, tenor = _req$body.tenor;

              if (!(tenor < 1 || tenor > 12)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                error: 'Tenor should be from 1 to 12'
              }));

            case 3:
              checkUser = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
              };
              checkLoan = {
                text: 'SELECT * FROM loans WHERE email = $1',
                values: [email]
              };
              _context4.prev = 5;
              _context4.next = 8;
              return _dbconnection["default"].query(checkUser);

            case 8:
              _ref5 = _context4.sent;
              rows = _ref5.rows;

              if (!(!rows[0] || !rows[0].status === 'verified')) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                error: 'Account status is not verified yet, try again later'
              }));

            case 12:
              _context4.next = 14;
              return _dbconnection["default"].query(checkLoan);

            case 14:
              _ref6 = _context4.sent;
              rowsCheck = _ref6.rows;

              if (!(rowsCheck[0] && rowsCheck[0].balance > 0)) {
                _context4.next = 18;
                break;
              }

              return _context4.abrupt("return", res.status(401).json({
                status: 401,
                error: 'Pay up your debt'
              }));

            case 18:
              createdOn = (0, _moment["default"])().toDate();
              interest = 0.05 * Number(amount);
              paymentInstallment = ((amount + interest) / tenor).toFixed(2);
              balance = amount;
              createQuery = {
                text: 'INSERT INTO loans(email, createdOn, tenor, amount, paymentInstallment, balance, interest) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                values: [email, createdOn, tenor, amount, paymentInstallment, balance, interest]
              };
              _context4.next = 25;
              return _dbconnection["default"].query(createQuery);

            case 25:
              _ref7 = _context4.sent;
              create = _ref7.rows;
              return _context4.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  loanId: create[0].id,
                  firstName: rows[0].firstName,
                  lastName: rows[0].lastName,
                  email: email,
                  tenor: tenor,
                  amount: amount,
                  paymentInstallment: create[0].paymentInstallment,
                  status: create[0].status,
                  balance: create[0].balance,
                  interest: create[0].interest
                }
              }));

            case 30:
              _context4.prev = 30;
              _context4.t0 = _context4["catch"](5);
              return _context4.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context4.t0.message)
              }));

            case 33:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 30]]);
    }));

    function createLoan(_x7, _x8) {
      return _createLoan.apply(this, arguments);
    }

    return createLoan;
  }(),
  approve: function () {
    var _approve = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res) {
      var id, status, checkLoan, update, _ref8, rows, _ref9, updateStatus;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              status = req.body.status;
              checkLoan = {
                text: 'SELECT * FROM loans WHERE id = $1',
                values: [id]
              };
              update = {
                text: 'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *',
                values: [status, id]
              };
              _context5.prev = 4;
              _context5.next = 7;
              return _dbconnection["default"].query(checkLoan);

            case 7:
              _ref8 = _context5.sent;
              rows = _ref8.rows;

              if (!(rows[0] && rows[0].status === 'pending')) {
                _context5.next = 15;
                break;
              }

              _context5.next = 12;
              return _dbconnection["default"].query(update);

            case 12:
              _ref9 = _context5.sent;
              updateStatus = _ref9.rows;
              return _context5.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  loanId: id,
                  loanAmount: updateStatus[0].amount,
                  tenor: updateStatus[0].tenor,
                  status: updateStatus[0].status,
                  monthlyInstallment: updateStatus[0].monthlyInstallment,
                  interest: updateStatus[0].interest
                }
              }));

            case 15:
              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Loan not found'
              }));

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context5.t0.message)
              }));

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 18]]);
    }));

    function approve(_x9, _x10) {
      return _approve.apply(this, arguments);
    }

    return approve;
  }(),
  createRepayment: function () {
    var _createRepayment = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res) {
      var id, checkLoan, _ref10, rows, loanId, _rows$, amount, paymentInstallment, balance, paidAmount, createQuery, _ref11, add;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              checkLoan = {
                text: 'SELECT * FROM loans WHERE id = $1',
                values: [id]
              };
              _context6.prev = 2;
              _context6.next = 5;
              return _dbconnection["default"].query(checkLoan);

            case 5:
              _ref10 = _context6.sent;
              rows = _ref10.rows;

              if (!rows[0]) {
                _context6.next = 17;
                break;
              }

              loanId = id;
              _rows$ = rows[0], amount = _rows$.amount, paymentInstallment = _rows$.paymentInstallment, balance = _rows$.balance;
              paidAmount = amount - balance;
              createQuery = {
                text: 'INSERT INTO repayments(loanId, amount) VALUES($1, $2) RETURNING *',
                values: [loanId, paidAmount]
              };
              _context6.next = 14;
              return _dbconnection["default"].query(createQuery);

            case 14:
              _ref11 = _context6.sent;
              add = _ref11.rows;
              return _context6.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  id: add[0].id,
                  loanId: loanId,
                  createdOn: add[0].createdOn,
                  amount: amount,
                  monthlyInstallment: paymentInstallment,
                  paidAmount: paidAmount,
                  balance: balance
                }
              }));

            case 17:
              return _context6.abrupt("return", res.status(404).json({
                status: 404,
                error: 'No loans found'
              }));

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context6.t0.message)
              }));

            case 23:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 20]]);
    }));

    function createRepayment(_x11, _x12) {
      return _createRepayment.apply(this, arguments);
    }

    return createRepayment;
  }()
};
var _default = Loans;
exports["default"] = _default;