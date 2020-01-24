import uuidv4 from 'uuid/v4';

import User, { UserInterface } from '@/models/user.model';

class UserRepository {
  create(name?: string): Promise<UserInterface> {
    const secretHash = uuidv4();

    return User.create({
      name: name || secretHash.split('-').pop(),
      secretHash,
    });
  }

  async edit(userId: string, name: string): Promise<UserInterface | null> {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name },
      { upsert: true },
    );

    if (!user) throw new Error('User not found.');

    return user;
  }
}

export default UserRepository;
