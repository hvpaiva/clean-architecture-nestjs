import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';
import { UserEntity } from 'infrastructure/database/mapper/UserEntity';

import { BaseRepository } from './BaseRepository';

@Injectable()
export class UsersRepository extends BaseRepository<User>
  implements IUsersRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, UserEntity);
  }
}
