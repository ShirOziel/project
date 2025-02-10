import { Router } from 'express';
import { getAbout } from '../controllers/about.controller.js'; // ייבוא הקונטרולר

const aboutRouter = Router();

aboutRouter.get('/', getAbout);

export default aboutRouter;
