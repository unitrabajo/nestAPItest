import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  
  @Post()
  payOrder( @Body() createPaypalDto: CreatePaypalDto ) {
    return this.paypalService.payOrder( createPaypalDto );
  }

}
