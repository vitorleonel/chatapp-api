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
}

export default UserRepository;
