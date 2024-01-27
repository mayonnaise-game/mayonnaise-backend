import express from 'express';
import { getCurrentUsers, getMyself } from '../service/user.service.js';

const router = express.Router();

router.get('/current', getCurrentUsers);
router.get('/me', getMyself);

export default router;
