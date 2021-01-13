"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Registrando a injeção de dependência do hash de senha
// Registrando a injeção de dependência do salvamento de imagem em disco
// appointments agendamentos
_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentsRepository.default); // users  usuarios


_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default); // user tokens


_tsyringe.container.registerSingleton('UserTokenRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);