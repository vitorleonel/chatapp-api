import jwt from 'jsonwebtoken';

import { UserInterface } from '@/models/user.model';

class AuthService {
  async authenticate({ _id, name }: UserInterface): Promise<string> {
    if (!process.env.APP_SECRET) throw new Error('App secret not provided.');

    const accessToken = jwt.sign({ id: _id, name }, 'asas', {
      expiresIn: '2h',
    });

    return accessToken;
  }
}

export default AuthService;
