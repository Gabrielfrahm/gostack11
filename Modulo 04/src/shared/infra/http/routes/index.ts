import { Router } from 'express';
import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import ProviderRouter from '@modules/appointments/infra/http/routes/providers.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/sessions', SessionsRouter);
routes.use('/appointments', AppointmentsRouter);
routes.use('/providers', ProviderRouter);
routes.use('/users', UsersRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);

export default routes;
