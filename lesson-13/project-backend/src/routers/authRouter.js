import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  googleOAuthCodeSchema,
} from '../validation/authSchemas.js';

import {
  registerController,
  verifyController,
  resendVerifyController,
  loginController,
  refreshSessionController,
  logoutUserController,
  getGoogleOAuthUrlController,
  loginWithGoogleOAuthController,
} from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerController);

authRouter.get('/verify', verifyController);

authRouter.post(
  '/resend-verify',
  validateBody(verifyEmailSchema),
  resendVerifyController,
);

authRouter.post('/login', validateBody(loginSchema), loginController);

authRouter.post('/refresh', refreshSessionController);

authRouter.post('/logout', logoutUserController);

authRouter.get('/google/get-oauth-url', getGoogleOAuthUrlController);

authRouter.post(
  '/google/confirm-oauth',
  validateBody(googleOAuthCodeSchema),
  loginWithGoogleOAuthController,
);

export default authRouter;
