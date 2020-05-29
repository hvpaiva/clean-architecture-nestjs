import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';

import { User } from 'domain/models/User';

export class UserVM {
  @Expose()
  @ApiProperty({
    description: 'The id of the user',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The name of the user',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The unique email of the user',
  })
  email: string;

  static toViewModel(user: User): UserVM {
    return plainToClass(UserVM, user, { excludeExtraneousValues: true });
  }

  static fromViewModel(vm: UserVM): User {
    return plainToClass(User, vm, { excludeExtraneousValues: true });
  }
}
