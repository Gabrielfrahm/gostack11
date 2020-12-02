import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointment from '../dtos/ICreateAppointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
