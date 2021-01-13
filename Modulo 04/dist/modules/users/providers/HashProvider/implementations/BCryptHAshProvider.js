"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHashProvider {
  async generateHash(payload) {
    // gera o hash da senha, recebendo uma string
    return (0, _bcryptjs.hash)(payload, 8);
  }

  async compareHash(payload, hashed) {
    // faz a verificação da senha
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

exports.default = BCryptHashProvider;