"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHAshProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHAshProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// injeção de dependência
_tsyringe.container.registerSingleton('HashProvider', _BCryptHAshProvider.default);