import { UserInterface } from '@/models/user.model';
import UserRepository from '@/repositories/user.repository';

import TestUtil from '@/utils/test';

describe('UserRepository', () => {
  const userRepository = new UserRepository();

  beforeAll(async () => {
    await TestUtil.openDbConnection();
  });

  afterAll(async () => {
    await TestUtil.closeDbConnection();
  });

  it('should create user', async () => {
    const user: UserInterface = await userRepository.create();

    expect(user).toHaveProperty('secretHash');
    expect(user.secretHash.length).not.toEqual(0);
  });

  it('should create user with name', async () => {
    const name = 'Vitor Leonel';
    const user: UserInterface = await userRepository.create(name);

    expect(user.name).toEqual(name);
  });
});
