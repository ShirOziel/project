import { Router } from 'express';
import controller from '../controllers/cost.controller';

const costRouter = Router();

costRouter.get('/', controller.getCosts);
costRouter.post('/', controller.addCost);

export default costRouter;
