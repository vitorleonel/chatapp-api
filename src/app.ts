import express from 'express';

import mongoose from 'mongoose';
import routes from './routes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
  }

  database(): void {
    mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  middlewares(): void {
    this.server.use(express.json());
    this.server.use(routes);
  }
}

export default new App().server;
