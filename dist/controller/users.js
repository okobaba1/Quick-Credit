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
var Users = {
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, email, firstName, lastName, password, address, hashedPassword, checkUser, createQuery, _ref, rows, _ref2, userRows, _userRows$, id, isAdmin, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Some values are missing'
              }));

            case 2:
              _req$body = req.body, email = _req$body.email, firstName = _req$body.firstName, lastName = _req$body.lastName, password = _req$body.password, address = _req$body.address;
              hashedPassword = _bcrypt["default"].hash(password, 10);
              checkUser = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
              };
              createQuery = {
                text: 'INSERT INTO users(email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5) RETURNING *',
                values: [email, firstName, lastName, hashedPassword, address]
              };
              _context.prev = 6;
              _context.next = 9;
              return _dbconnection["default"].query(checkUser);

            case 9:
              _ref = _context.sent;
              rows = _ref.rows;

              if (!rows[0]) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 409,
                error: 'User already exists'
              }));

            case 13:
              _context.next = 15;
              return _dbconnection["default"].query(createQuery);

            case 15:
              _ref2 = _context.sent;
              userRows = _ref2.rows;
              _userRows$ = userRows[0], id = _userRows$.id, isAdmin = _userRows$.isAdmin;
              token = _jsonwebtoken["default"].sign({
                email: email,
                id: id,
                isAdmin: isAdmin
              }, process.env.SECRET_KEY, {
                expiresIn: '24hrs'
              });
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                token: token,
                data: {
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email
                }
              }));

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](6);
              return _context.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context.t0.message)
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 22]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, password, checkUser, _ref3, rows;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                error: 'kindly put in your email and password'
              }));

            case 2:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              checkUser = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
              };
              _context2.prev = 4;
              _context2.next = 7;
              return _dbconnection["default"].query(checkUser);

            case 7:
              _ref3 = _context2.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                error: 'Please sign Up'
              }));

            case 11:
              _bcrypt["default"].compare(password, rows[0].password, function () {
                if (!res) {
                  return res.status(401).json({
                    status: 401,
                    error: 'Incorrect password'
                  });
                }

                var token = _jsonwebtoken["default"].sign({
                  email: email,
                  id: rows[0].id,
                  isAdmin: rows[0].isAdmin
                }, process.env.SECRET_KEY, {
                  expiresIn: '1024hrs'
                });

                return res.status(200).json({
                  status: 200,
                  message: 'login successsful',
                  data: {
                    token: token,
                    id: rows[0].id,
                    firstName: rows[0].firstName,
                    lastName: rows[0].lastName,
                    email: rows[0].email
                  }
                });
              });

              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              return _context2.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context2.t0.message)
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 14]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  verify: function () {
    var _verify = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var email, checkUser, _ref4, rows, update, _ref5, rowsUpdate;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              email = req.params.email;
              checkUser = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
              };
              _context3.prev = 2;
              _context3.next = 5;
              return _dbconnection["default"].query(checkUser);

            case 5:
              _ref4 = _context3.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(401).json({
                status: 401,
                error: 'Not a registered email'
              }));

            case 9:
              if (!(rows[0].status === 'verified')) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", res.status(401).json({
                status: 401,
                error: 'User is already verified'
              }));

            case 11:
              update = {
                text: "UPDATE users SET status = 'verified' WHERE email = $1 RETURNING *",
                values: [email]
              };
              _context3.next = 14;
              return _dbconnection["default"].query(update);

            case 14:
              _ref5 = _context3.sent;
              rowsUpdate = _ref5.rows;
              return _context3.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  email: email,
                  firstName: rowsUpdate[0].firstName,
                  lastName: rowsUpdate[0].lastName,
                  password: rowsUpdate[0].password,
                  address: rowsUpdate[0].address,
                  status: rowsUpdate[0].status
                }
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(500).json({
                status: 500,
                error: "Internal server error ".concat(_context3.t0.message)
              }));

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 19]]);
    }));

    function verify(_x5, _x6) {
      return _verify.apply(this, arguments);
    }

    return verify;
  }()
};
var _default = Users;
exports["default"] = _default;