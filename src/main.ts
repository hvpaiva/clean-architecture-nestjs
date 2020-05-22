import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
      .setTitle('Driver Manager')
      .setDescription('Services for complementary driver information')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    SwaggerModule.setup('/', app, document);

    logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
    logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer');

  await app.listen(3000);
}
bootstrap();
