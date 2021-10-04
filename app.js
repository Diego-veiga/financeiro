import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import userRouter from './src/routes/userRoutes';
import tokenRouter from './src/routes/tokenRouter';
import creditorRouter from './src/routes/creditorRouter';
import './src/database';
import swaggerJson from './swagger.json';
import billRouter from './src/routes/billRouter';

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
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
  }

  router() {
    this.app.use('/user', userRouter);
    this.app.use('/token', tokenRouter);
    this.app.use('/creditor', creditorRouter);
    this.app.use('/bill', billRouter);
  }
}

export default new App().app;
