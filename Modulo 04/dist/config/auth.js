"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '7d'
  }
};
var _default = authConfig;
exports.default = _default;