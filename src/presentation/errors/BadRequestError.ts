import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error message.',
    example: 'Unexpected token } in JSON at position 24',
  })
  message: string;

  @ApiProperty({
    description: 'The time of the executed error.',
    example: new Date(),
  })
  timestamp: Date;

  @ApiProperty({
    description: 'The REST path called.',
    example: '/users',
  })
  path: string;
}
