import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { promises } from 'fs';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('v1');

  const pkg = JSON.parse(
    await promises.readFile(join('.', 'package.json'), 'utf8'),
  );
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api/`, app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
