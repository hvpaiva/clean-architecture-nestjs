import { Module } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UsersRepository } from 'infrastructure/database/repositories/UsersRepository';
import { PostsController } from 'presentation/controllers/PostsController';
import { PostsUseCases } from 'application/use-cases/PostsUseCases';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [
    PostsUseCases,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class PostsModule {}
