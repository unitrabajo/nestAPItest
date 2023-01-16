import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordForget } from './entities/passwordForget.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  imports: [

    ConfigModule,

    MailModule,

    TypeOrmModule.forFeature([
      User,
      PasswordForget
    ]),
    
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SEED'),
          signOptions: {
            expiresIn: '4h'
          }
        }
      }
    })

    
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
