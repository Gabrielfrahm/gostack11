import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../Controllers/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionController();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default SessionsRouter;
