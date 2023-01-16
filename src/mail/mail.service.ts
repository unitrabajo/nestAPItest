import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  
  constructor(private mailerService: MailerService) {}

 
  async sendEmailToken(email: string, token: string ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Restablece tu contraseña',
      template: 'reset-password', 
      context: {
        token
      },
    });
  }


}

// ./../user/user.entity
export interface User {
  email: string;
  name: string;
}