import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserNotFoundException, ServerException } from '../errors/index';
import {
  GetUserByEmailResponse,
  UserNotFoundResponse,
  EditUserResponse,
  CreateUserResponse
} from '../types';

class UserController {
  public path = '/users';
  public router = Router();
  public prisma = new PrismaClient();

  constructor() {
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.get(`${this.path}`, this.getUserByEmail);
    this.router.post(`${this.path}/new`, this.createUser);
    this.router.post(`${this.path}/edit/:userId`, this.editUser);
  }

  private getUserByEmail = async (
    req: Request,
    res: Response<GetUserByEmailResponse | UserNotFoundResponse>,
    next: NextFunction
  ): Promise<any> => {
    console.log(req.query);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: req.query.email as string
        }
      });
      if (!user) {
        return res.status(404).json({
          error: new UserNotFoundException('User Not Found'),
          data: undefined,
          success: false
        });
      }
      return res.status(200).json({
        error: undefined,
        data: user,
        success: true
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({
          error: new ServerException(err.message),
          data: undefined,
          success: false
        });
      }
    }
  };

  private editUser = async (
    req: Request,
    res: Response<EditUserResponse>,
    next: NextFunction
  ): Promise<any> => {
    const editUserResponse = await this.prisma.user.update({
      where: {
        id: Number(req.params.userId)
      },
      data: { ...req.body }
    });

    return res
      .status(200)
      .json({ error: undefined, success: true, data: editUserResponse });
  };

  private createUser = async (
    req: Request,
    res: Response<CreateUserResponse>,
    next: NextFunction
  ): Promise<any> => {
    const createUserResponse = await this.prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    });

    return res
      .status(201)
      .json({ error: undefined, success: true, data: createUserResponse.id });
  };
}

export default UserController;
