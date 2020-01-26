import 'dotenv/config';
import express from 'express';

import routes from './routes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
  }

  middlewares(): void {
    this.server.use(express.json());
    this.server.use(routes);
  }
}

export default new App().server;
