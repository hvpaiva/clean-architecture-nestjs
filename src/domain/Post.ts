import { User } from 'domain/User';
export class Post {
  id: number;
  title: string;
  text: string;
  user: User;
}