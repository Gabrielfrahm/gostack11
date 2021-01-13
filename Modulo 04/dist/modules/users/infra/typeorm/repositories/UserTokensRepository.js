"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokensRepository {
  // uma variável que vai receber o repositório
  constructor() {
    this.ormRepository = void 0;
    // o repositório e criado aqui
    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async findByToken(token) {
    const userToken = this.ormRepository.findOne({
      where: {
        token
      }
    });
    return userToken;
  }

  async generate(user_id) {
    const userToken = this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

}

var _default = UserTokensRepository;
exports.default = _default;