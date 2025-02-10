import express, { json } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import userRouter from './routes/user.router';
import costRouter from './routes/cost.router';
import aboutRouter from './routes/about.router';
import connectDB from './config/database.config';
import { errorHandler } from './middleware/error.middleware';
import path from 'path';


// הצגת משתני הסביבה
config();

// הגדרת האפליקציה
const main = async () => {
  connectDB();
  const app = express();

  // הגדרת PUG כמנוע תבניות
  app.set('view engine', 'pug'); // הצגת pug כמנוע תבניות
  app.set('views', './views');   // הגדרת תיקיית views שבה ישמרו קבצי ה-PUG
  
  // הגדרת Route ל-GET לדף הוספת פריט עלות
  app.get('/add', (req, res) => {
    res.render('add-cost');
  });

  //הגדרת דוח חודשי
  app.get('/report', (req, res) => {
    res.render('report');
  });

  //הגדרת יוזרים
  app.get('/user', (req, res) => {
    res.render('user');
  });
  
//הגדרת פרטי קבוצה
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
    // שימוש ב-middleware
  app.use(json());
  app.use(morgan('dev'));
  app.use(errorHandler);

  // הגדרת ה-Routes
  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);
  app.use('/api/about', aboutRouter);
  
  const PORT = process.env.PORT || 5000;

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
