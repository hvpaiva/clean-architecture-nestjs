import { Post } from './Post';
import { DomainException } from 'domain/exceptions/DomainException';

export class User {
  id?: number;

  name: string;

  email: string;

  posts?: Post[];

  createdAt?: Date;

  updatedAt?: Date;

  constructor(name: string, email: string, posts?: Post[], id?: number) {
    this.name = name;
    this.email = email;
    this.posts = posts;
    this.id = id;
  }

  findPost(postId: number): Post {
    return this.posts?.find(p => p.id === postId) ?? null;
  }

  findPosts(): Post[] {
    return this.posts ?? [];
  }

  createPost(post: Post): void {
    if (!this.posts) this.posts = new Array<Post>();

    if (this.posts.map(p => p.title).includes(post.title))
      throw new DomainException('Post with the same name already exists');

    this.posts.push(post);
  }
}
