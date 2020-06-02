import { User } from 'domain/models/User';
import { IEntity } from 'domain/shared/IEntity';

export class Post implements IEntity {
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

  equals(entity: IEntity): boolean {
    if (!(entity instanceof Post)) return false;

    return this.id === entity.id;
  }
}
