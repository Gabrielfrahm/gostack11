import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

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
