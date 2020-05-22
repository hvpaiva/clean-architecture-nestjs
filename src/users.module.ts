import { UsersRepository } from 'infrastructure/repositories/UsersRepository';
import { Module } from '@nestjs/common';

import { IUsersRepository } from 'application/repositories/IUsersRepository';
import { UsersService } from 'application/services/UsersService';
import { UsersController } from 'presentation/controllers/UsersController';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [
        UsersService,
        { provide: IUsersRepository, useClass: UsersRepository}
    ],
})
export class UsersModule {}
