import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error validation error.',
    example: [
      {
        property: 'name',
        errors: ['isNotEmpty'],
        constraints: {
          isNotEmpty: 'name should not be empty',
        },
      },
      {
        property: 'email',
        errors: ['isEmail', 'isNotEmpty'],
        constraints: {
          isEmail: 'email must be an email',
          isNotEmpty: 'email should not be empty',
        },
      },
    ],
  })
  error: [
    {
      property: string;
      errors: string[];
      constraints: {
        [type: string]: string;
      };
    },
  ];

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
