"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProvidersService = _interopRequireDefault(require("../../../services/ListProvidersService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProvidersController {
  async index(request, response) {
    const user_id = request.user.id; // usando injeção de dependências

    const listProvidersService = _tsyringe.container.resolve(_ListProvidersService.default);

    const providers = await listProvidersService.execute({
      user_id
    });
    return response.json(providers);
  }

}

exports.default = ProvidersController;