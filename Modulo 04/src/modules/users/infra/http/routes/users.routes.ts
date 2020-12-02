import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import UsersController from '../Controllers/UserController';
import UserAvatarController from '../Controllers/UserAvatarController';

const UsersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

UsersRouter.post('/', usersController.create);

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UsersRouter;
