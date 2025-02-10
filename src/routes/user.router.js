import { Router } from 'express';
import { getUsers, createUser, getUserDetails } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserDetails);
userRouter.post('/', createUser);

export default userRouter;