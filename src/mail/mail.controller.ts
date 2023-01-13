import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {


  constructor(private readonly mailService: MailService) {
  }


  @Get('send')
  async findAll() {
    await this.mailService.sendUserConfirmation({ email: 'marianaolivas031096@gmail.com', name: 'Rodolfo' }, '1234567');
  }


  @Get('test')
  async test() {
    console.log('AQUI')
    return this.mailService.sendEmail();
  }
  
}
