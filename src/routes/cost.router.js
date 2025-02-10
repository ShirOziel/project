import { Router } from 'express';
import controller from '../controllers/cost.controller.js';

const { getCosts, addCost, getMonthlyReport } = controller;

const costRouter = Router();

costRouter.get('/', getCosts);
costRouter.post('/add', addCost);
costRouter.get('/report', getMonthlyReport);

export default costRouter;