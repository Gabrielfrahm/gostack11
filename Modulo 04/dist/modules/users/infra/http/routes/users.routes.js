"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

var _UserController = _interopRequireDefault(require("../Controllers/UserController"));

var _UserAvatarController = _interopRequireDefault(require("../Controllers/UserAvatarController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UsersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const usersController = new _UserController.default();
const userAvatarController = new _UserAvatarController.default();
UsersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
UsersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = UsersRouter;
exports.default = _default;