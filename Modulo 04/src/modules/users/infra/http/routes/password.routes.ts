import { Router } from 'express';

import ForgotPassworrController from '../Controllers/ForgotPasswordController';
import ResetPasswordController from '../Controllers/ResetPasswordController';

const PasswordRouter = Router();
const forgotPasswordController = new ForgotPassworrController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/forgot', forgotPasswordController.create);
PasswordRouter.post('/reset', resetPasswordController.create);

export default PasswordRouter;
