import { Controller, Param, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { CreateUserVM } from 'presentation/view-models/CreateUserVM';
import { UserVM } from 'presentation/view-models/UserVM';

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
  async get(
    @Param('id') id: number
  ): Promise<UserVM> {
    const user = await this.usersUseCases.getById(id);

    return UserVM.toViewModel(user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  async getAll(): Promise<UserVM[]> {
    const users = await this.usersUseCases.get();

    return users.map(user => UserVM.toViewModel(user));
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  async post(@Body() createUser: CreateUserVM): Promise<UserVM> {
    const newUser = await this.usersUseCases.save(CreateUserVM.fromViewModel(createUser));

    return UserVM.toViewModel(newUser);
  }
}