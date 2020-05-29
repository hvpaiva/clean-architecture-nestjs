import { plainToClass, Expose } from 'class-transformer';

import { User } from 'domain/models/User';

export class Post {
  @Expose()
  id?: number;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  user: User;

  constructor(post: Post) {
    Object.assign(
      this,
      plainToClass(Post, post, { excludeExtraneousValues: true }),
    );
  }
}
