import { Injectable, Logger } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async get(): Promise<User[]> {
    this.logger.log('Fetch all users');

    return await this.usersRepository.find({});
  }

  async getById(id: number): Promise<User> {
    this.logger.log('Fetch all users');

    return await this.usersRepository.findOne(id);
  }

  async save(user: User): Promise<User> {
    this.usersRepository.transaction<User>(async () => {
      const savedUser = await this.usersRepository.save(user);

      await this.usersRepository.save(
        new User({
          name: 'John Doe',
          email: 'john.doe@gmail.com',
        }),
      );

      throw new Error('Proposital error to force rollback');
      return savedUser;
    });
    throw new Error(`Cannot save User ${user.name}`);
  }

  async update(user: User): Promise<boolean> {
    const result = await this.usersRepository.update({ id: user.id }, user);

    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete({ id });

    return result.affected > 0;
  }
}
