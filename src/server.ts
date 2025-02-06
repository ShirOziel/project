import morgan from 'morgan';
import { config } from 'dotenv';
import express, { json } from 'express';
import userRouter from './routes/user.router';
import costRouter from './routes/cost.router';
import connectDB from './config/database.config';
import { errorHandler } from './middleware/error.middleware';

config();

const main = async () => {
  connectDB();
  const app = express();

  app.use(json());
  app.use(errorHandler);
  app.use(morgan('dev'));

  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);

  const PORT = process.env.PORT || 5000;

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
