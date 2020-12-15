import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    // transforma a hora da requisição em hora redonda sempre
    const appointmentDate = startOfHour(date);

    // se a data de agendamento for antes do que agora ele nao deixa realizar o agendamento
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a  past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointment between 8am and 5pm');
    }

    // confere se  a data passada ja nao esta no array percorrido
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // se o user id for o mesmo que o provider nao consegue fazer um agendamento com ele mesmo

    // caso a data ja esteja com agendamento ele da erro
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
