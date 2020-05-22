import { CreateUserVM } from './../view-models/CreateUserVM';
import { UsersService } from './../../application/services/UsersService';
import { Controller, Param, Get, Post, Body } from "@nestjs/common";
import { UserVM } from 'presentation/view-models/UserVM';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const user = await this.usersService.getById(id);

    return UserVM.toViewModel(user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  async getAll(): Promise<UserVM[]> {
    const users = await this.usersService.get();

    return users.map(user => UserVM.toViewModel(user));
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  async post(@Body() createUser: CreateUserVM): Promise<UserVM> {
    const newUser = await this.usersService.save(CreateUserVM.fromViewModel(createUser));

    return UserVM.toViewModel(newUser);
  }
}