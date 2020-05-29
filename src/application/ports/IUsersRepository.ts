import { Injectable } from '@nestjs/common';

import { User } from 'domain/models/User';

import { ICrudRepository } from './ICrudRepository';

@Injectable()
export abstract class IUsersRepository extends ICrudRepository<User> {}