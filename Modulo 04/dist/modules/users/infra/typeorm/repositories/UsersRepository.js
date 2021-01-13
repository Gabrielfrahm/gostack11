"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  // uma variável que vai receber o repositório
  constructor() {
    this.ormRepository = void 0;
    // o repositório e criado aqui
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findAllProviders({
    except_user_id
  }) {
    let users;

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          // faz uma verificação quando o id nao for o id passado.
          id: (0, _typeorm.Not)(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  async findById(id) {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create(userData) {
    // cria o usuário
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;