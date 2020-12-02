import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  // uma variável que vai receber o repositório
  private ormRepository: Repository<Appointment>;

  constructor() {
    // o repositório e criado aqui
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    // criando o appointment que deve receber provider_id e a date
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
