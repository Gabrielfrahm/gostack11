"use strict";

var _ListProviderDaysAvailabilityService = _interopRequireDefault(require("./ListProviderDaysAvailabilityService"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderDaysAvailabilityService;
let fakeAppointmentsRepository;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentRepository.default();
    listProviderDaysAvailabilityService = new _ListProviderDaysAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('Should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 21, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 21, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 21, 11).getTime();
    });
    const availability = await listProviderDaysAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
      day: 21
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});