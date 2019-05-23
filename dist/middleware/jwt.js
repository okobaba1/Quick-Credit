"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySuperAdmin = exports.verifyUser = exports.verifyAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var verifyAdmin = function verifyAdmin(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided.'
    });
  }

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to Authenticate token'
      });
    }

    if (decoded.isAdmin != true) {
      return res.status(401).json({
        status: 401,
        error: 'Not authorized to perform this operation'
      });
    }
  });

  next();
};

exports.verifyAdmin = verifyAdmin;

var verifyUser = function verifyUser(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided.'
    });
  }

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to Authenticate token'
      });
    }

    if (decoded.isAdmin == Boolean(true)) {
      return res.status(401).json({
        status: 401,
        error: 'Not authorized to perform this operation'
      });
    }
  });

  next();
};

exports.verifyUser = verifyUser;

var verifySuperAdmin = function verifySuperAdmin(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided.'
    });
  }

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to Authenticate token'
      });
    }

    if (decoded.isAdmin == true) {
      return res.status(401).json({
        status: 401,
        error: 'Not authorized to perform this operation'
      });
    }
  });

  next();
};

exports.verifySuperAdmin = verifySuperAdmin;