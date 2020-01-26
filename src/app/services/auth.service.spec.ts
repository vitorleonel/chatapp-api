import AuthService from '@/services/auth.service';
import UserRepository from '@/repositories/user.repository';

import TestUtil from '@/utils/test';
import { UserInterface } from '@/models/user.model';

describe('AuthService', () => {
  let userRepository: UserRepository;
  let user: UserInterface;

  beforeAll(async () => {
    await TestUtil.openDbConnection();

    userRepository = new UserRepository();
    user = await userRepository.create();
  });

  afterAll(async () => {
    await TestUtil.closeDbConnection();
  });

  it('should throw error when not provided APP_SECRET for authenticate', async () => {
    const authService = new AuthService();

    try {
      await authService.authenticate(user);

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toEqual('App secret not provided.');
    }
  });

  it('should authenticate when pass user instance', async () => {
    process.env.APP_SECRET = 'test';

    const authService = new AuthService();
    const accessToken = await authService.authenticate(user);

    expect(accessToken.length).not.toEqual(0);
  });
});
