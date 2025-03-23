import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient, User } from '@prisma/client';

type GetUserByEmailResponse = {
  error: string | undefined;
  success: boolean;
  data: User;
};

type UserNotFoundResponse = {
  message: string;
};

type CreateUserResponse = {
  error: string | undefined;
  success: boolean;
  data: User['id'];
};

type EditUserResponse = {
  error: string | undefined;
  success: boolean;
  data: User;
};

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
    const user = await this.prisma.user.findUnique({
      where: {
        email: req.query.email as string
      }
    });

    if (!user) {
      console.log('unable to find the user');
      return res.status(404).json({
        message: 'Unable to find the user'
      });
    }

    return res.status(200).json({
      error: undefined,
      data: user,
      success: true
    });
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
