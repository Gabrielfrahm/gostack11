import { Router } from 'express';
import AppointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', SessionsRouter);
routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);

export default routes;
