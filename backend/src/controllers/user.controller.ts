import { NextFunction, Request, Response, Router } from 'express';

class UserController {
  public path = '/user';
  public router = Router();

  constructor() {
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.post(`new`, this.createUser);
    this.router.get('/', this.getUserByEmail);
    this.router.post('/edit/:userId', this.editUser);
  }

  private getUserByEmail() {}

  private editUser() {}

  private createUser() {}
}

export default UserController;
