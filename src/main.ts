import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { HttpExceptionFilter } from 'infrastructure/rest/http-exception.filter';
import { LoggingInterceptor } from 'infrastructure/rest/logging.interceptor';
import { ValidationPipe } from 'infrastructure/rest/validation.pipe';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    const configService = app.get(ConfigService);
    Logger.log(
      `Environment: ${chalk
        .hex('#87e8de')
        .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
      'Bootstrap',
    );

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60,
        max: 1000, // 1000 requests por windowMs
        message:
          '⚠️  Too many request created from this IP, please try again after an hour',
      }),
    );

    // REST Global configurations
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    const APP_NAME = configService.get('APP_NAME');
    const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
    const API_VERSION = configService.get('API_VERSION', 'v1');
    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .setVersion(API_VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    SwaggerModule.setup('/', app, document);

    Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
    Logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer');

    const HOST = configService.get('HOST', 'localhost');
    const PORT = configService.get('PORT', '3000');

    await app.listen(PORT);
    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://${HOST}:${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
