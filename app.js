import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoutes';
import tokenRouter from './src/routes/tokenRouter';
import creditorRouter from './src/routes/creditorRouter';
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
    this.app.use('/token', tokenRouter);
    this.app.use('/creditor', creditorRouter);
  }
}

export default new App().app;
