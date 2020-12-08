import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProfileController from '../Controllers/ProfileController';

const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.get('/', profileController.show);
ProfileRouter.put('/', profileController.update);

export default ProfileRouter;
