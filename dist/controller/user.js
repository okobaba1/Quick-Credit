"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../dummyData/auth"));

var User =
/*#__PURE__*/
function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
  }

  (0, _createClass2["default"])(User, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          address = _req$body.address;
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


      if (email && firstName && lastName && password && address) {
        userData = {
          id: _auth["default"].length + 1,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          address: address,
          status: 'unverified',
          isAdmin: false
        };

        _auth["default"].push(userData); // copy/add to dummy data


        var token = _jsonwebtoken["default"].sign({
          email: email,
          id: userData.id
        }, process.env.SECRET_KEY, {
          expiresIn: '24hrs'
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
        error: 'All fields are required'
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password; // confirm for empty input

      if (email && password) {
        // check if email is in already signed up
        var existingUser = _auth["default"].filter(function (user) {
          return user.email === email && user.password === password;
        });

        if (existingUser.length === 1) {
          // generate token
          var firstName = existingUser[0].firstName;
          var lastName = existingUser[0].lastName;
          var id = existingUser[0].id;
          var isAdmin = existingUser[0].isAdmin;

          var token = _jsonwebtoken["default"].sign({
            email: email,
            id: id,
            isAdmin: isAdmin
          }, process.env.SECRET_KEY, {
            expiresIn: '172hrs'
          });

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

        return res.status(401).json({
          status: 401,
          error: 'email/password is incorrect'
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'kindly put in your email and password'
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
        _auth["default"].find(function (user) {
          return user.email === email;
        }).status = 'verified';
        return res.status(200).json({
          status: 200,
          data: {
            email: email,
            firstName: userToUpdate[0].firstName,
            lastName: userToUpdate[0].lastName,
            password: userToUpdate[0].password,
            address: userToUpdate[0].address,
            status: 'verified'
          }
        });
      }

      return res.status(401).json({
        status: 401,
        error: 'User is already verified'
      });
    }
  }, {
    key: "superAdmin",
    value: function superAdmin(req, res) {
      var id = req.params.id;

      var userToAdmin = _auth["default"].find(function (user) {
        return user.isAdmin === false && user.id === Number(id);
      });

      if (userToAdmin) {
        _auth["default"].find(function (user) {
          return user.id === Number(id);
        }).status = 'verified';
        return res.status(201).json({
          status: 201,
          message: 'Admin created succesfully'
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
  }]);
  return User;
}();

var _default = User;
exports["default"] = _default;