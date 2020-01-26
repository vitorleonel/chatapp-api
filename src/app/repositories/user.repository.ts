import uuidv4 from 'uuid/v4';

import User, { UserInterface } from '../models/user.model';

class UserRepository {
  create(name?: string): Promise<UserInterface> {
    const secretHash = uuidv4();

    return User.create({
      name: name || secretHash.split('-').pop(),
      secretHash,
    });
  }

  async edit(userId: string, name: string): Promise<UserInterface> {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name },
      { new: true },
    );

    if (!user) throw new Error('User not found.');

    return user;
  }
}

export default UserRepository;
