import { Expose } from 'class-transformer';

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

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
  }
}
