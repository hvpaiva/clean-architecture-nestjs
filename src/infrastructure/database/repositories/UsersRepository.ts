import { EntityRepository, EntityManager } from 'typeorm';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';
import { UserEntity } from 'infrastructure/database/mapper/UserEntity';

import { BaseRepository } from './BaseRepository';

@EntityRepository(UserEntity)
export class UsersRepository extends BaseRepository<User> implements IUsersRepository {

  constructor(readonly manager: EntityManager) {
    super(manager, UserEntity);
  }
}