import { Injectable } from '@nestjs/common';

import { User } from 'domain/models/User';

import { IRepository } from './IRepository';

@Injectable()
export abstract class IUsersRepository extends IRepository<User> {}
