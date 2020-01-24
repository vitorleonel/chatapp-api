import 'dotenv/config';
import express from 'express';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
  }
}

export default new App().server;
