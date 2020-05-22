import { IUsersRepository } from 'application/repositories/IUsersRepository';
import { EntityRepository, EntityManager } from 'typeorm';

import { User } from 'domain/User';
import { UserEntity } from 'infrastructure/mapper/UserEntity';
import { BaseRepository } from './BaseRepository';

@EntityRepository(UserEntity)
export class UsersRepository extends BaseRepository<User> implements IUsersRepository {

  constructor(readonly manager: EntityManager) {
    super(manager, UserEntity);
  }
}