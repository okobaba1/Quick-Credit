"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../dummyData/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          address = _req$body.address,
          status = _req$body.status;
      var userData = {};

      var existingUser = _auth["default"].filter(function (user) {
        return user.email === email;
      }); // check if user exists


      if (existingUser.length) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists'
        });
      } // Confirm for empty requests


      if (email.length && firstName.length && lastName.length && password.length && address.length && status.length) {
        userData = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          address: address,
          status: status,
          userType: 1
        };

        _auth["default"].push(userData); // copy/add to dummy data


        var token = _jsonwebtoken["default"].sign({
          email: email,
          id: _auth["default"].length,
          userType: 1
        }, process.env.SECRET_KEY, {
          expiresIn: '72hrs'
        });

        return res.status(201).json({
          status: 'Success',
          data: {
            id: _auth["default"].length,
            email: email,
            firstName: firstName,
            lastName: lastName,
            token: token
          }
        });
      }

      return res.status(400).json({
        status: 'Fail',
        message: 'All fields are required'
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password; // confirm for empty input

      if (email.length && password.length) {
        // check if email is in already signed up
        var existingUser = _auth["default"].filter(function (user) {
          return user.email === email && user.password === password;
        });

        if (existingUser.length === 1) {
          // generate token
          var token = _jsonwebtoken["default"].sign({
            email: email,
            id: _auth["default"].length,
            userType: 2
          }, process.env.SECRET_KEY, {
            expiresIn: '72hrs'
          });

          var firstName = existingUser[0].firstName;
          var lastName = existingUser[0].lastName;
          var id = existingUser[0].id;
          return res.status(200).json({
            status: 200,
            data: {
              message: 'login successsful',
              token: token,
              id: id,
              firstName: firstName,
              lastName: lastName,
              email: email
            }
          });
        }

        return res.status(404).json({
          status: 404,
          error: 'email/password is incorrect'
        });
      }

      return res.status(400).json({
        status: 400,
        message: 'kindly put in your email and password'
      });
    }
  }, {
    key: "verifyUSer",
    value: function verifyUSer(req, res) {
      var email = req.params.email;

      var userToUpdate = _auth["default"].filter(function (user) {
        return user.email === email;
      });

      if (userToUpdate[0].status === 'unverified') {
        userToUpdate[0].status = 'verified';
        var _userToUpdate$ = userToUpdate[0],
            status = _userToUpdate$.status,
            firstName = _userToUpdate$.firstName,
            lastName = _userToUpdate$.lastName,
            address = _userToUpdate$.address;
        return res.status(200).json({
          status: 200,
          data: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            status: status
          }
        });
      }

      return res.status(401).json({
        status: 401,
        error: 'User is already verified'
      });
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;