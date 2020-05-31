import { Post } from 'domain/models/Post';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { IPostsRepository } from 'application/ports/IPostsRepository';
import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';

@Injectable()
export class PostsUseCases {
  private readonly logger = new Logger(PostsUseCases.name);

  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly postsRepository: IPostsRepository,
  ) {}

  async getAllPostsByUser(userId: number): Promise<Post[]> {
    this.logger.log('Fetch all user`s posts');

    const user = await this.usersRepository.findOne(userId);
    console.log(user);

    return user.posts;
  }

  async getPostByUser(userId: number, postId: number): Promise<Post> {
    const user = await this.usersRepository.findOne(userId, {
      loadEagerRelations: true,
    });

    return user.findPost(postId);
  }

  async createPost(userId: number, post: Post): Promise<Post> {
    const user = await this.usersRepository.findOne(userId);

    if (user === null)
      throw new NotFoundException(`User ${userId} wasn't found`);

    user.createPost(post);
    console.log(user);
    const mockUser = new User(
      'Gabriela Paiva 2',
      'gabi.paiva@gmail.com',
      [{ title: 'Post Um', text: 'Texto qualquer' } as Post],
      1,
    );

    const savedUser = await this.usersRepository.save(mockUser);
    console.log(savedUser);

    return savedUser.posts.find(p => p.title === post.title);
  }
}
