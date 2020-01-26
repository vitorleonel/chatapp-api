import { Request, Response } from 'express';

import { UserInterface } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import AuthService from '../services/auth.service';

class UserController {
  async signup(_: Request, response: Response): Promise<Response> {
    const userRepository: UserRepository = new UserRepository();
    const authService: AuthService = new AuthService();

    const user: UserInterface = await userRepository.create();
    const accessToken: string = await authService.authenticate(user);

    return response.status(201).json({
      accessToken,
    });
  }
}

export default new UserController();
