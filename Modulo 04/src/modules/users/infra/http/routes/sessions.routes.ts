import { Router } from 'express';

import SessionController from '../Controllers/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionController();

SessionsRouter.post('/', sessionController.create);

export default SessionsRouter;
