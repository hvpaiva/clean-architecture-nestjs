import { Post as UserPost } from 'domain/models/Post';
import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

import { PostsUseCases } from 'application/use-cases/PostsUseCases';

@ApiTags('Posts')
@Controller()
export class PostsController {
  constructor(private readonly postsUseCases: PostsUseCases) {}

  @Get('users/:userId/posts')
  @ApiOperation({
    summary: 'Find all Posts of an User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  async getPostsByUser(@Param('userId') userId: number): Promise<UserPost[]> {
    return await this.postsUseCases.getAllPostsByUser(userId);
  }

  @Get('users/:userId/posts/:postId')
  @ApiOperation({
    summary: 'Find a Post of an User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'The post id',
  })
  async getPost(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ): Promise<UserPost> {
    return await this.postsUseCases.getPostByUser(userId, postId);
  }

  @Post('users/:userId/posts')
  @ApiOperation({
    summary: 'Creates a Post',
  })
  async createPost(
    @Param('userId') userId: number,
    @Body() post: UserPost,
  ): Promise<UserPost> {
    return await this.postsUseCases.createPost(userId, post);
  }
}
