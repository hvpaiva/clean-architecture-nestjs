import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'domain/models/Post';

export class PostVM {
  @Expose()
  @ApiProperty({
    description: 'The id of the post',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The title of the post',
    example: 'Domain Driven Design',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The unique email of the user',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
  text: string;

  @Expose()
  @ApiProperty({ description: 'The crational date of the post' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'The date of the last post update' })
  updatedAt: Date;

  static toViewModel(user: Post): PostVM {
    return plainToClass(PostVM, user, { excludeExtraneousValues: true });
  }

  static fromViewModel(vm: PostVM): Post {
    return plainToClass(Post, vm, { excludeExtraneousValues: true });
  }
}
