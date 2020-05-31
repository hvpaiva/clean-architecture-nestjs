import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { CreateUserVM } from 'presentation/view-models/users/CreateUserVM';
import { UserVM } from 'presentation/view-models/users/UserVM';
import { BadRequestError } from 'presentation/errors/BadRequestError';
import { UnprocessableEntityError } from 'presentation/errors/UnprocessableEntityError';
import { NotFoundError } from 'presentation/errors/NotFoundError';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCases: UsersUseCases) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Find one user by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The user id',
  })
  @ApiOkResponse({ description: 'User founded.', type: UserVM })
  @ApiNotFoundResponse({
    description: 'User cannot be founded.',
    type: NotFoundError,
  })
  async get(@Param('id') id: string): Promise<UserVM> {
    const user = await this.usersUseCases.getById(parseInt(id, 10));

    return UserVM.toViewModel(user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  @ApiOkResponse({ description: 'All user`s fetched.', type: [UserVM] })
  async getAll(): Promise<UserVM[]> {
    const users = await this.usersUseCases.get();

    return users.map(user => UserVM.toViewModel(user));
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  @ApiCreatedResponse({ description: 'User created.', type: UserVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  async createUser(@Body() createUser: CreateUserVM): Promise<UserVM> {
    const newUser = await this.usersUseCases.save(
      CreateUserVM.fromViewModel(createUser),
    );

    return UserVM.toViewModel(newUser);
  }
}
