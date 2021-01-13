"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeNotificationRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let createAppointment;
let fakeNotificationRepository;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeNotificationRepository = new _FakeNotificationRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeNotificationRepository, fakeCacheProvider);
  });
  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id');
  });
  it('Should not be able to create a two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 11, 10, 12);
    await createAppointment.execute({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: appointmentDate
    });
    await expect(createAppointment.execute({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: appointmentDate
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 11, 10, 11)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 11, 10, 13)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'user-id',
      user_id: 'provider-id',
      date: new Date(2020, 11, 11, 7)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: 'user-id',
      user_id: 'provider-id',
      date: new Date(2020, 11, 11, 18)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});