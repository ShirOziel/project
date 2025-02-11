import express, { json } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import userRouter from './routes/user.router';
import costRouter from './routes/cost.router';
import aboutRouter from './routes/about.router';
import connectDB from './config/database.config';
import { errorHandler } from './middleware/error.middleware';
import { getAbout } from './controllers/about.controller';
import costController from './controllers/cost.controller';
const { getMonthlyReport, addCost } = costController;

// Load environment variables
config();

const main = async () => {
  connectDB();
  const app = express();

  
 //Root route for the API
  app.get("/", (req, res) => {
  res.send("Welcome to Yarden and Shir Project!");
  });

  // Middleware
  app.use(json());
  app.use(morgan('dev'));
  app.use(errorHandler);

  // Define routes
  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);
  app.use('/api/about', aboutRouter);

  // Add API route for ABOUT (as required by the instructor)
  app.get('/api/about/', getAbout);

  // Add API route for monthly report (report)
  app.get('/api/report/', getMonthlyReport);

  // Add API route for adding a cost item (add)
  app.post('/api/add/', addCost);

  // Start the server
  const PORT = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
};

main();