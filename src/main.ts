import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors();

  await app.listen(48001 , '162.241.156.14', () => {

      console.log('DB_PASSWORD : ', process.env.DB_PASSWORD);
      console.log('DB_NAME : ', process.env.DB_NAME);
      console.log('DB_HOST : ', process.env.DB_HOST);
      console.log('DB_PORT : ', process.env.DB_PORT);
      console.log('DB_USERNAME : ', process.env.DB_USERNAME);

  });



}
bootstrap();
