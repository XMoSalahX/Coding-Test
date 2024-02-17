import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppOptions } from './utils/winston.helper';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, AppOptions);
  // swagger config
  const options = new DocumentBuilder()
    .setTitle('Post Project')
    .setDescription('App For Code Test.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOptions);

  SwaggerModule.setup(process.env.SWAGGER_ROUTE, app, document, customOptions);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
