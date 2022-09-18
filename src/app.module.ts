import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaypalModule } from './paypal/paypal.module';
import { MailModule } from './mail/mail.module';
import { PaymentsModule } from './payments/payments.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST_DEV,
      port: +process.env.DB_PORT_DEV,
      database: process.env.DB_NAME_DEV,
      username: process.env.DB_USERNAME_DEV,
      password: process.env.DB_PASSWORD_DEV,
      // entities: [],
      // synchronize: true,
    }),

    PaypalModule,

    MailModule,

    PaymentsModule,

    PackagesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
