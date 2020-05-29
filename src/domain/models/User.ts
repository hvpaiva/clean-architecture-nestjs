import { plainToClass, Expose } from 'class-transformer';
import { DeepPartial } from 'typeorm';

import { Post } from './Post';

export class User {
  @Expose()
  id: number;

  @Expose()
  name: string;
  
  @Expose()
  email: string;
  
  @Expose()
  posts: Post[];

  constructor(user: DeepPartial<User>) {
    Object.assign(
      this,
      plainToClass(User, user, { excludeExtraneousValues: true })
    );
  }
}