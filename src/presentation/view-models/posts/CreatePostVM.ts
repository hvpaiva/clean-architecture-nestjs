import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Post } from 'domain/models/Post';

export class CreatePostVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the post',
    example: 'Domain Driven Design',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the post',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
  text: string;

  static fromViewModel(vm: CreatePostVM): Post {
    return new Post(vm.title, vm.text);
  }
}
