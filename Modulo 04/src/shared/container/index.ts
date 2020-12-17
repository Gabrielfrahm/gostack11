import { container } from 'tsyringe';

// Registrando a injeção de dependência do hash de senha
import '@modules/users/providers';

// Registrando a injeção de dependência do salvamento de imagem em disco
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

// appointments agendamentos
container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

// users  usuarios
container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

// user tokens
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
