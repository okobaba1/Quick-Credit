"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("@babel/polyfill");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dbconnection = _interopRequireDefault(require("./dbconnection"));

var Migration = {
  migrate: function () {
    var _migrate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var adminQuery, values;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              console.log('Dropping users table');
              _context.next = 4;
              return _dbconnection["default"].query('DROP TABLE IF EXISTS users CASCADE');

            case 4:
              console.log('Dropping loans table');
              _context.next = 7;
              return _dbconnection["default"].query('DROP TABLE IF EXISTS loans CASCADE');

            case 7:
              console.log('Dropping repayments table');
              _context.next = 10;
              return _dbconnection["default"].query('DROP TABLE IF EXISTS repayments CASCADE');

            case 10:
              console.log('Creating User table');
              _context.next = 13;
              return _dbconnection["default"].query("\n      CREATE TABLE IF NOT EXISTS users(\n        id SERIAL PRIMARY KEY NOT NULL,\n        email VARCHAR(255) UNIQUE NOT NULL,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        address VARCHAR(128) NOT NULL,\n        password TEXT NOT NULL,\n        status VARCHAR(50) DEFAULT 'unverified',\n        isadmin BOOLEAN DEFAULT false\n      );\n    ");

            case 13:
              console.log('Creating Loan table');
              _context.next = 16;
              return _dbconnection["default"].query("\n      CREATE TABLE IF NOT EXISTS loans(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,\n        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        status VARCHAR(50) DEFAULT 'pending',\n        repaid BOOLEAN DEFAULT false,\n        tenor INTEGER NOT NULL,\n        amount FLOAT NOT NULL,\n        paymentInstallment FLOAT NOT NULL,\n        balance FLOAT NOT NULL,\n        interest FLOAT NOT NULL\n      );\n    ");

            case 16:
              console.log('Creating repayment table');
              _context.next = 19;
              return _dbconnection["default"].query("\n      CREATE TABLE IF NOT EXISTS repayments(\n        id SERIAL PRIMARY KEY,\n        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        loanId INTEGER REFERENCES loans(id) on DELETE CASCADE,\n        amount FLOAT NOT NULL\n      );\n    ");

            case 19:
              adminQuery = "INSERT INTO\n    users(email, firstname, lastname, address, password, status, isAdmin)\n    VALUES($1,$2,$3,$4,$5,$6,$7)\n    RETURNING email, firstName, lastName, address, status, isAdmin";
              values = ['Admin', 'victor', 'victoradmin@quickcredit.com', _bcrypt["default"].hash('password', 10), '1, Quick Credit Avenue', 'verified', true];
              console.log('Creating Admin');
              _context.next = 24;
              return _dbconnection["default"].query(adminQuery, values);

            case 24:
              console.log('Admin Created');
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }));

    function migrate() {
      return _migrate.apply(this, arguments);
    }

    return migrate;
  }()
};
var _default = Migration;
exports["default"] = _default;
Migration.migrate();