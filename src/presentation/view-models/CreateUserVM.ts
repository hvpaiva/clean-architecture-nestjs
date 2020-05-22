import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

import { User } from 'domain/User';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user'
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The unique email of the user'
  })
  email: string;

  static fromViewModel(vm: CreateUserVM): User {
    return new User(vm);
  }
}