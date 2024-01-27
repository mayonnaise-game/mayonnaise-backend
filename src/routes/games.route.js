import { Router } from 'express';
import { getCurrentGame } from '../service/games.service.js';

const gamesRouter = Router();
gamesRouter.get('/current', getCurrentGame);

export default gamesRouter;
