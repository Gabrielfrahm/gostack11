import { Router } from 'express';
import AppointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);

export default routes;
