import { JsonWebTokenError } from 'jsonwebtoken';

import AuthService from '@/services/auth.service';
import UserRepository from '@/repositories/user.repository';

import TestUtil from '@/utils/test';
import { UserInterface } from '@/models/user.model';

describe('AuthService', () => {
  let userRepository: UserRepository;
  let user: UserInterface;
  let authService: AuthService;

  const oldAppSecret = process.env.APP_SECRET;

  beforeAll(async () => {
    await TestUtil.openDbConnection();

    userRepository = new UserRepository();
    user = await userRepository.create();

    authService = new AuthService();
  });

  afterAll(async () => {
    await TestUtil.closeDbConnection();
  });

  beforeEach(() => {
    process.env.APP_SECRET = oldAppSecret;
  });

  it('should throw error when not provided APP_SECRET', async () => {
    try {
      process.env.APP_SECRET = '';

      authService = new AuthService();

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toEqual('App secret not provided.');
    }
  });

  it('should authenticate when pass user instance', async () => {
    const accessToken = await authService.authenticate(user);

    expect(accessToken.length).not.toEqual(0);
  });

  it('should verify acessToken with expired or invalid hash', async () => {
    try {
      await authService.authorization('test_hash');

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
    }
  });

  it('should verfy accessToken with valid hash', async () => {
    const accessToken = await authService.authenticate(user);

    const verifiedData = await authService.authorization(accessToken);

    expect(verifiedData).toHaveProperty('id');
    expect(verifiedData).toHaveProperty('name');
  });
});
