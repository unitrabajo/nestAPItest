import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaypalModule } from './paypal/paypal.module';
import { MailModule } from './mail/mail.module';
import { PaymentsModule } from './payments/payments.module';
import { PackagesModule } from './packages/packages.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';

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
      autoLoadEntities: true,
      // entities: [ ],
      // synchronize: true,
    }),

    PaypalModule,

    MailModule,

    PaymentsModule,

    PackagesModule,

    AuthModule,

    JobsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
