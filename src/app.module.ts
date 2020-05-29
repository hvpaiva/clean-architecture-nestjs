

import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm'

import { IUnitOfWork } from 'application/ports/IUnitOfWork';
import { CacheService } from 'infrastructure/cache';
import { TypeOrmUnitOfWork } from 'infrastructure/database/uow/TypeOrmUnitOfWork';
import { setEnvironment } from 'infrastructure/environments';
import { UsersModule } from 'infrastructure/ioc/users.module';
import { HealthController } from 'infrastructure/terminus/index';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment()
    }),
    TypeOrmModule.forRoot(),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    {
      provide: IUnitOfWork,
      useClass: TypeOrmUnitOfWork
    }
  ],
})
export class AppModule {}
