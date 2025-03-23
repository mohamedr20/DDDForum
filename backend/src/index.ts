import express, { Application, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface Controller {
  path: string;
  router: Router;
}

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(express.json());
    this.initializeControllers(controllers);
  }

  public listen(port: string) {
    this.app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}

export default App;
