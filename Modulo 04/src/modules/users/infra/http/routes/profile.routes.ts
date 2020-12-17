import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProfileController from '../Controllers/ProfileController';

const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.get('/', profileController.show);
ProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password ')),
    },
  }),
  profileController.update,
);

export default ProfileRouter;
