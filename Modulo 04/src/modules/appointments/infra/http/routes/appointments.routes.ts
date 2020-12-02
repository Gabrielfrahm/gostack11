import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../Controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
