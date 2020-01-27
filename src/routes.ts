import { Router } from 'express';

import UserController from './app/controllers/user.controller';

const router = Router();

router.post('/auth/signup', UserController.signup);

export default router;
