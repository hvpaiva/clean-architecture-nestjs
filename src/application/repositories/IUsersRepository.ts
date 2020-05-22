import { User } from 'domain/User';

import { ICrudRepository } from './ICrudRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IUsersRepository extends ICrudRepository<User> {}