import { Post } from 'domain/models/Post';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';

@Injectable()
export class PostsUseCases {
  private readonly logger = new Logger(PostsUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async getAllPostsByUser(userId: number): Promise<Post[]> {
    this.logger.log('Fetch all user`s posts');

    const user = await this.usersRepository.findOne(userId, {
      relations: ['posts'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    return user.findPosts();
  }

  async getPostByUser(userId: number, postId: number): Promise<Post> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['posts'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    const post = user.findPost(postId);

    if (!post)
      throw new NotFoundException(`The post {${postId}} wasn't found.`);

    return post;
  }

  async createPost(userId: number, post: Post): Promise<Post> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['posts'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    user.createPost(post);

    const savedUser = await this.usersRepository.save(user);

    return savedUser.posts.find(p => p.title === post.title);
  }
}
