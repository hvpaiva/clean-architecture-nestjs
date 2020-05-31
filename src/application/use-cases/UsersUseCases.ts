import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async get(): Promise<User[]> {
    this.logger.log('Find all users');

    return await this.usersRepository.find({ loadEagerRelations: true });
  }

  async getById(id: number): Promise<User> {
    this.logger.log(`Find the user: ${id}`);

    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`The user {${id}} has not found.`);

    return user;
  }

  async save(user: User): Promise<User> {
    this.logger.log(`Saving a user`);
    return await this.usersRepository.save(user);
  }

  async update(user: User): Promise<boolean> {
    this.logger.log(`Updating a user: ${user.id}`);
    const result = await this.usersRepository.update({ id: user.id }, user);

    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    this.logger.log(`Deleting a user: ${id}`);
    const result = await this.usersRepository.delete({ id });

    return result.affected > 0;
  }
}
