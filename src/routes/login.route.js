import { Router } from 'express';
import { login } from '../service/login.service.js';

const loginRouter = Router();
loginRouter.post('/', login);

export default loginRouter;
