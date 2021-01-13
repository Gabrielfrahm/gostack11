"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findById(id) {
    const user = this.users.find(users => users.id === id);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(users => users.email === email);
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;

    if (except_user_id) {
      // apenas usuários que for diferente do userID passado.
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, userData);
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;