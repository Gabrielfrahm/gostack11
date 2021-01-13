"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderDaysAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDaysAvailabilityService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year,
      day
    } = request.query; // usando injeção de dependências

    const listProviderDaysAvailabilityService = _tsyringe.container.resolve(_ListProviderDaysAvailabilityService.default);

    const availability = await listProviderDaysAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ProviderDayAvailabilityController;