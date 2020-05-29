import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

import { User } from 'domain/models/User';

export class CreateUserVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The unique email of the user',
  })
  email: string;

  static fromViewModel(vm: CreateUserVM): User {
    return new User(vm);
  }
}