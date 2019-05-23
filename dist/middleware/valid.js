"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var validator = [(0, _check.check)('firstName').not().isEmpty().withMessage('First name field cannot be empty.'), (0, _check.check)('lastName').not().isEmpty().withMessage('Last name field cannot be empty.'), (0, _check.check)('email').not().isEmpty().withMessage('Email field cannot be empty'), (0, _check.check)('email').isEmail().withMessage('Enter valid email address.'), (0, _check.check)('address').not().isEmpty().withMessage('Address cannot be empty.'), (0, _check.check)('password').not().isEmpty().withMessage('Please password is required'), (0, _check.check)('password').isLength({
  min: 6
}).withMessage('Password should be atleast 6 characters')];
var applyForLoan = [(0, _check.check)('amount').not().isEmpty().withMessage('Amount field cannot be empty.'), (0, _check.check)('tenor').not().isEmpty().withMessage('Kindly input Tenor.'), (0, _check.check)('tenor').isInt().withMessage('Please input your tenor in digits')];

var validationHandler = function validationHandler(req, res, next) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      errors: errors.array().map(function (error) {
        return error.msg;
      })[0]
    });
  }

  next();
};

var valid = {
  validationHandler: validationHandler,
  validator: validator,
  applyForLoan: applyForLoan
};
var _default = valid;
exports["default"] = _default;