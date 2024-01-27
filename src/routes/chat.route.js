import express from 'express';
import { getChats, addChat } from '../service/chat.service.js';

const router = express.Router();

router.post('/', addChat);
router.get('/', getChats);

export default router;
