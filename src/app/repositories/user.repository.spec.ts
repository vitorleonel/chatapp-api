import { UserInterface } from '../models/user.model';
import UserRepository from './user.repository';

import TestUtil from '../utils/test';

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

  it('should edit user by id', async () => {
    const currentUser: UserInterface = await userRepository.create();
    const newName = 'New name';

    const updatedUser: UserInterface = await userRepository.edit(
      currentUser._id,
      newName,
    );

    expect(updatedUser.name).not.toEqual(currentUser.name);
    expect(updatedUser.name).toEqual(newName);
  });

  it('should edit user by invalid id', async () => {
    try {
      await userRepository.edit('5e2b4ea007e7823fc1a00220', 'NewName');

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('User not found.');
    }
  });
});
