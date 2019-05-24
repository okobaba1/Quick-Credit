"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var createAdmin = "\n  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)  VALUES('pappy', 'bear', 'Lagos', 'pappybear@gmail.com', 'password', 'true', 'verified');";
var createUser = "\n  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)\n  VALUES('Obito', 'Uchiha', 'ANBU HQ', 'uchiha.obito@akatsuki.org', 'wdnkndn123', 'false', 'unverified');";
var createLoans = "\n  INSERT INTO loans(email, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest)\n  VALUES('uchiha.obito@akatsuki.org', '".concat(Date(), "', 'approved', 'false', 3, 20000, 7000, 21000, 1000);");
var createRepayment = "\n  INSERT INTO repayments(createdOn, loanId, amount)\n  VALUES('".concat(Date(), "', 1, 7000)");