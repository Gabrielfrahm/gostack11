"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  // uma variável que vai receber o repositório
  constructor() {
    this.ormRepository = void 0;
    // o repositório e criado aqui
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date, provider_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointment;
  }

  async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointment;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    // criando o appointment que deve receber provider_id e a date
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;