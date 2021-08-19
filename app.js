import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoutes';
import './src/database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  router() {
    this.app.use('/user', userRouter);
  }
}

export default new App().app;
