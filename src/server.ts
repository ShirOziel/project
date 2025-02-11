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

// טעינת משתני הסביבה
config();

const main = async () => {
  connectDB();
  const app = express();

  // הגדרת PUG כמנוע תבניות
  app.set('view engine', 'pug');
  app.set('views', './views');

  // Middleware
  app.use(json());
  app.use(morgan('dev'));
  app.use(errorHandler);

  // הגדרת ה-Routes
  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);
  app.use('/api/about', aboutRouter);

  // הוספת נתיב API ל-ABOUT (כפי שהמרצה דורש)
  app.get('/api/about/', getAbout);

  // הוספת נתיב API לדוח חודשי (report)
  app.get('/api/report/', getMonthlyReport);

  // הוספת נתיב API להוספת פריט עלות (add)
  app.post('/api/add/', addCost);

  // הפעלת השרת
  const PORT = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();