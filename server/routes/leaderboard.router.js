

import express from 'express'
import { leaderboard } from '../controllers/leaderboard.controller.js';

const app= express.Router();

app.get("/leaderboard",leaderboard);

export default app;