import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error message.',
    example: 'The user {12} has not be found.',
  })
  message: string;

  @ApiProperty({
    description: 'The time of the executed error.',
    example: new Date(),
  })
  timestamp: Date;

  @ApiProperty({
    description: 'The REST path called.',
    example: '/users/12',
  })
  path: string;
}
