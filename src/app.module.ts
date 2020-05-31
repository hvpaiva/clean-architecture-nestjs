import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheService } from 'infrastructure/cache';
import { setEnvironment } from 'infrastructure/environments';
import { UsersModule } from 'infrastructure/ioc/users.module';
import { PostsModule } from 'infrastructure/ioc/posts.module';
import { HealthController } from 'infrastructure/terminus/index';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
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
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
