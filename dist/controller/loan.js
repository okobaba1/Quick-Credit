"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _loans = _interopRequireDefault(require("../dummyData/loans"));

var _auth = _interopRequireDefault(require("../dummyData/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Loan =
/*#__PURE__*/
function () {
  function Loan() {
    _classCallCheck(this, Loan);
  }

  _createClass(Loan, null, [{
    key: "specific",
    value: function specific(req, res) {
      var id = req.params.id;

      var existingLoan = _loans["default"].filter(function (user) {
        return user.id === Number(id);
      });

      if (existingLoan.length === 1) {
        var data = existingLoan[0];
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
    key: "unpaid",
    value: function unpaid(req, res) {
      var status = req.query.status;

      var unpaidLoans = _loans["default"].filter(function (user) {
        return user.status === 'approved' && user.repaid === false;
      });

      if (unpaidLoans.length >= 1) {
        return res.status(200).json({
          status: 200,
          data: unpaidLoans
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'They are no debtors'
      });
    }
  }, {
    key: "paid",
    value: function paid(req, res) {
      var status = req.query.status;

      var paidLoans = _loans["default"].filter(function (user) {
        return user.status === 'approved' && user.repaid === true;
      });

      if (paidLoans.length >= 1) {
        return res.status(200).json({
          status: 200,
          data: paidLoans
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Clients aren\'t paying'
      });
    }
  }, {
    key: "allLoans",
    value: function allLoans(req, res) {
      return res.status(200).json({
        status: 200,
        data: _loans["default"]
      });
    }
  }, {
    key: "loanRepayment",
    value: function loanRepayment(req, res) {
      var id = req.params.id;

      var repayArray = _loans["default"].filter(function (user) {
        return user.id === Number(id);
      });

      if (repayArray.length === 1) {
        var repay = repayArray[0];
        return res.status(200).json({
          status: 200,
          data: {
            id: repay.id,
            createdOn: repay.createdOn,
            monthlyInstallment: repay.paymentInstallment,
            amount: repay.amount
          }
        });
      }

      return res.status(200).json({
        status: 404,
        message: 'You are a Lannister'
      });
    }
  }, {
    key: "loanApply",
    value: function loanApply(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          amount = _req$body.amount,
          tenor = _req$body.tenor;

      var checkStatus = _auth["default"].filter(function (user) {
        return user.status === 'verified';
      });

      if (checkStatus.length === 1) {
        // check if user owes money
        var checkDebt = _loans["default"].filter(function (user) {
          return user.email === email && user.balance >= 1;
        });

        if (checkDebt.length === 0 && tenor <= 12) {
          var interest = 0.05 * Number(amount);
          var data = {
            id: _loans["default"].length,
            firstName: _auth["default"].firstName,
            lastName: _auth["default"].lastName,
            email: email,
            tenor: tenor,
            amount: amount,
            interest: interest,
            paymentInstallment: parseFloat((amount + interest) / tenor, 10),
            status: 'pending',
            balance: amount,
            createdOn: (0, _moment["default"])().toDate()
          };

          _loans["default"].push(data);

          return res.status(201).json({
            status: 201,
            data: data
          });
        }

        return res.status(400).json({
          status: 400,
          message: 'Pay up your debt'
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'please check back and apply later'
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

      var index = _loans["default"].indexOf('loanApplication');

      if (loanApplication) {
        loanApplication.status = status;

        _loans["default"].splice(index, 1, loanApplication);

        return res.status(200).json({
          status: 200,
          message: "loan ".concat(status),
          data: loanApplication
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'User not found'
      });
    }
  }]);

  return Loan;
}();

var _default = Loan;
exports["default"] = _default;