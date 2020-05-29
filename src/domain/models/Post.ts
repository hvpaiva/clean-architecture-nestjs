import { User } from 'domain/models/User';

export class Post {
  id: number;
  title: string;
  text: string;
  user: User;
}