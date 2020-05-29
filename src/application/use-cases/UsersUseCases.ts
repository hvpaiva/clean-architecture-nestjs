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
    return await this.usersRepository.save(user);
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