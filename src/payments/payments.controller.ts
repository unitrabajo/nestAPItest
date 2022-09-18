import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateSaleDto, CreateTransactionDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('sale')
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.paymentsService.createSale(createSaleDto);
  }


  @Post('transaction')
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.paymentsService.createTransaction(createTransactionDto);
  }


}
