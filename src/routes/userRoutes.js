import { Router } from 'express';
import controller from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', controller.getUsers);
userRouter.post('/', controller.createUser);

export default userRouter;
