import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a two appointment on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      provider_id: '123123',
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        provider_id: '123123',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
