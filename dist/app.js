"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = _interopRequireDefault(require("./routes/routes"));

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
app.use('/api/v1', _routes["default"]);
app.get('*', function (req, res) {
  return res.status(200).json({
    message: 'WELCOME TO QUICK-CREDIT'
  });
});
app.set('port', port);
app.listen(port, console.log("liistening to ".concat(port)));
var _default = app;
exports["default"] = _default;