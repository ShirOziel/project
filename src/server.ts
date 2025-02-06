import { config } from 'dotenv';
import connectDB from './config/db';
import express, { json } from 'express';
import userRouter from './routes/userRoutes';
import costRouter from './routes/costRoutes';


config();

const main = async () => {
    connectDB();
    const app = express();
    app.use(json());

    app.use('/api/users', userRouter);
    app.use('/api/costs', costRouter);

    const PORT = process.env.PORT || 5000;
    return app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main()
