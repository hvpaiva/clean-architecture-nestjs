import { Module } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { UsersRepository } from 'infrastructure/database/repositories/UsersRepository';
import { UsersController } from 'presentation/controllers/UsersController';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [
        UsersUseCases,
        { provide: IUsersRepository, useClass: UsersRepository}
    ],
})
export class UsersModule {}
