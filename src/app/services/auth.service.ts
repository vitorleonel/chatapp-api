import jwt from 'jsonwebtoken';

import { UserInterface } from '@/models/user.model';

class AuthService {
  private appSecret: string;

  constructor() {
    if (!process.env.APP_SECRET) throw new Error('App secret not provided.');

    this.appSecret = process.env.APP_SECRET;
  }

  async authenticate({ _id, name }: UserInterface): Promise<string> {
    const accessToken = jwt.sign({ id: _id, name }, this.appSecret, {
      expiresIn: '2h',
    });

    return accessToken;
  }

  async authorization(accessToken: string): Promise<object> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const { id, name } = <any>jwt.verify(accessToken, this.appSecret);

    return { id, name };
  }
}

export default AuthService;
