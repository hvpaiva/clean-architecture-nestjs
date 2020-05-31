import { User } from 'domain/models/User';

export class Post {
  id?: number;

  title: string;

  text: string;

  user: User;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(title: string, text: string, user?: User, id?: number) {
    this.title = title;
    this.text = text;
    this.user = user;
    this.id = id;
  }
}
