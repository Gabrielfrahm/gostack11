import AppError from '@shared/error/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
    );
  });
  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id',
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
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        provider_id: 'provider-id',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        provider_id: 'provider-id',
        date: new Date(2020, 11, 10, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: '123123',
        user_id: '123123',
        date: new Date(2020, 11, 10, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'user-id',
        user_id: 'provider-id',
        date: new Date(2020, 11, 11, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: 'user-id',
        user_id: 'provider-id',
        date: new Date(2020, 11, 11, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
