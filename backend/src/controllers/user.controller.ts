import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  UserNotFoundException,
  ServerException,
  EmailAlreadyInUseException,
  UserNameTakenException,
  ValidationException
} from '../errors/index';
import {
  EditUserResponse,
  ErrorResponse,
  GetUserByEmailResponse,
  UserSuccessResponse
} from '../types';
import { generateRandomPassword, validateFields } from '../helpers';

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
    res: Response<GetUserByEmailResponse | ErrorResponse>,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: req.query.email as string
        }
      });

      if (!user) {
        return res.status(404).json({
          error: new UserNotFoundException(),
          data: 'UserNotFound',
          success: false
        });
      }

      return res.status(200).json({
        data: user,
        success: true
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({
          error: new ServerException(err.message),
          data: 'ServerError',
          success: false
        });
      }
    }
  };

  private editUser = async (
    req: Request,
    res: Response<EditUserResponse | ErrorResponse>,
    _next: NextFunction
  ): Promise<any> => {
    const { email, id, username } = req.body;
    const userId = Number(id);
    const invalidPayload = validateFields(req.body);

    if (invalidPayload) {
      return res.status(400).json({
        error: new ValidationException(),
        data: 'ValidationError',
        success: false
      });
    }

    if (email) {
      const userWithEmail = await this.prisma.user.findFirst({
        where: {
          email: req.body.email
        }
      });

      if (userWithEmail) {
        return res.status(409).json({
          error: new EmailAlreadyInUseException(),
          data: 'EmailAlreadyInUse',
          success: false
        });
      }
    }

    if (username) {
      const userWithUsername = await this.prisma.user.findFirst({
        where: {
          email: req.body.email
        }
      });

      if (userWithUsername) {
        return res.status(409).json({
          error: new UserNameTakenException(),
          data: 'UsernameAlreadyTaken',
          success: false
        });
      }
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: { ...req.body }
    });

    if (!user) {
      return res.status(404).json({
        error: new UserNotFoundException(),
        data: 'UserNotFound',
        success: false
      });
    }

    return res.status(200).json({ success: true, data: user });
  };

  private createUser = async (
    req: Request,
    res: Response<UserSuccessResponse | ErrorResponse>,
    _next: NextFunction
  ): Promise<any> => {
    const createUserResponse = await this.prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: generateRandomPassword(),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    });

    return res.status(201).json({ success: true, data: createUserResponse.id });
  };
}

export default UserController;
