import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { PostsUseCases } from 'application/use-cases/PostsUseCases';
import { NotFoundError } from 'presentation/errors/NotFoundError';
import { BadRequestError } from 'presentation/errors/BadRequestError';
import { UnprocessableEntityError } from 'presentation/errors/UnprocessableEntityError';
import { PostVM } from 'presentation/view-models/posts/PostVM';
import { CreatePostVM } from 'presentation/view-models/posts/CreatePostVM';

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
  @ApiOkResponse({ description: 'Posts founded.', type: [PostVM] })
  @ApiNotFoundResponse({
    description: 'If the user passed in userId not exists.',
    type: NotFoundError,
  })
  async getPostsByUser(@Param('userId') userId: string): Promise<PostVM[]> {
    const posts = this.postsUseCases.getAllPostsByUser(parseInt(userId, 10));

    return (await posts).map(post => PostVM.toViewModel(post));
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
  @ApiOkResponse({ description: 'Post founded.', type: PostVM })
  @ApiNotFoundResponse({
    description: 'If the user or the post not exists.',
    type: NotFoundError,
  })
  async getPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<PostVM> {
    const post = await this.postsUseCases.getPostByUser(
      parseInt(userId, 10),
      parseInt(postId, 10),
    );

    return PostVM.toViewModel(post);
  }

  @Post('users/:userId/posts')
  @ApiOperation({
    summary: 'Creates a Post',
  })
  @ApiCreatedResponse({ description: 'User created.', type: PostVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  async createPost(
    @Param('userId') userId: string,
    @Body() createPost: CreatePostVM,
  ): Promise<PostVM> {
    const post = await this.postsUseCases.createPost(
      parseInt(userId, 10),
      CreatePostVM.fromViewModel(createPost),
    );

    return PostVM.toViewModel(post);
  }
}
