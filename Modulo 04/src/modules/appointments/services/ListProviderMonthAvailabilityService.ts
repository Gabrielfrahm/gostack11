import { getDate, getDaysInMonth } from 'date-fns';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/error/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';
// import IUserRepository from '@modules/users/repositories/IUserRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

// [{ day: 1 , available: false}]
type IResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    // numero de dias de mes
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // array dos dias [1,2,3...]
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // retorna um horário disponível no dia
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
