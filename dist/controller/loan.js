"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var _loans = _interopRequireDefault(require("../dummyData/loans"));

var _auth = _interopRequireDefault(require("../dummyData/auth"));

var Loan =
/*#__PURE__*/
function () {
  function Loan() {
    (0, _classCallCheck2["default"])(this, Loan);
  }

  (0, _createClass2["default"])(Loan, null, [{
    key: "specific",
    value: function specific(req, res) {
      var id = req.params.id;

      var existingLoan = _loans["default"].find(function (user) {
        return user.id === Number(id);
      });

      if (existingLoan) {
        var data = existingLoan;
        return res.status(200).json({
          status: 200,
          data: data
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'Not a loan application'
      });
    }
  }, {
    key: "viewLoans",
    value: function viewLoans(req, res) {
      var _req$query = req.query,
          status = _req$query.status,
          repaid = _req$query.repaid;

      if (status && repaid) {
        var parsedRepaid = JSON.parse(repaid);

        if (status === 'approved' && parsedRepaid === false) {
          var unpaidLoans = _loans["default"].filter(function (user) {
            return user.status === 'approved' && user.repaid === Boolean(false);
          });

          if (unpaidLoans) {
            return res.status(200).json({
              status: 200,
              data: unpaidLoans
            });
          }

          return res.status(404).json({
            status: 404,
            error: 'They are no debtors'
          });
        }

        if (status === 'approved' && parsedRepaid === Boolean(true)) {
          var paidLoans = _loans["default"].filter(function (user) {
            return user.status === 'approved' && user.repaid === Boolean(true);
          });

          if (paidLoans) {
            return res.status(200).json({
              status: 200,
              data: paidLoans
            });
          }

          return res.status(404).json({
            status: 404,
            error: 'No paid loan was found'
          });
        }
      }

      return res.status(200).json({
        status: 200,
        data: _loans["default"]
      });
    }
  }, {
    key: "loanRepayment",
    value: function loanRepayment(req, res) {
      var id = req.params.id;

      var repayArray = _loans["default"].find(function (user) {
        return user.id === Number(id);
      });

      if (repayArray) {
        return res.status(200).json({
          status: 200,
          data: {
            id: id,
            createdOn: repayArray.createdOn,
            monthlyInstallment: repayArray.paymentInstallment,
            amount: repayArray.amount
          }
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'Not a Loan Application'
      });
    }
  }, {
    key: "loanApply",
    value: function loanApply(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          amount = _req$body.amount,
          tenor = _req$body.tenor;

      if (tenor < 1 || tenor > 12) {
        return res.status(400).json({
          status: 400,
          error: 'Tenor should be from 1 to 12'
        });
      }

      var checkStatus = _auth["default"].filter(function (user) {
        return user.status === 'verified' && user.email === email;
      });

      if (!checkStatus) {
        return res.status(404).json({
          status: 404,
          error: 'Account status is not verified yet, try again later'
        });
      } // check if user owes money


      var checkDebt = _loans["default"].find(function (user) {
        return user.user === email && user.balance > 0;
      });

      if (checkDebt) {
        return res.status(401).json({
          status: 401,
          error: 'Pay up your debt'
        });
      }

      var interest = 0.05 * Number(amount);
      var data = {
        id: _loans["default"].length + 1,
        firstName: _auth["default"].firstName,
        lastName: _auth["default"].lastName,
        email: email,
        tenor: tenor,
        amount: amount,
        interest: interest,
        paymentInstallment: ((amount + interest) / tenor).toFixed(2),
        status: 'pending',
        balance: 0,
        createdOn: (0, _moment["default"])().toDate()
      };

      _loans["default"].push(data);

      return res.status(201).json({
        status: 201,
        data: data
      });
    }
  }, {
    key: "Approveloan",
    value: function Approveloan(req, res) {
      var id = req.params.id;
      var status = req.body.status;

      var loanApplication = _loans["default"].find(function (user) {
        return user.id === Number(id) && user.status === 'pending';
      });

      if (loanApplication) {
        _loans["default"].find(function (user) {
          return user.id === Number(id) && user.status === 'pending';
        }).status = status;
        return res.status(200).json({
          status: 200,
          message: "Loan ".concat(status),
          data: {
            loanId: id,
            LoanAmount: loanApplication.amount,
            tenor: loanApplication.status,
            status: status,
            monthlyInstallment: loanApplication.paymentInstallment,
            interest: loanApplication.interest
          }
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'Loan not found'
      });
    }
  }, {
    key: "repaymentRecord",
    value: function repaymentRecord(req, res) {
      var id = req.params.id;

      var findLoan = _loans["default"].find(function (user) {
        return user.id === Number(id);
      });

      if (findLoan) {
        return res.status(201).json({
          status: 201,
          data: {
            loanId: id,
            createdOn: findLoan.createdOn,
            amount: findLoan.amount,
            monthlyInstallment: findLoan.paymentInstallment,
            paidAmount: findLoan.amount - findLoan.balance,
            balance: findLoan.balance
          }
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'No loans found'
      });
    }
  }]);
  return Loan;
}();

var _default = Loan;
exports["default"] = _default;