import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateSaleDto, CreateTransactionDto } from './dto';

@Injectable()
export class PaymentsService {

  constructor( private readonly dataSource: DataSource ) {}

  async createSale(createSaleDto: CreateSaleDto) {

    const { userId, packageId, amount, price, saleId } = createSaleDto;

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    var result = await queryRunner.manager.query(
      `call publish_vta( ${userId}, ${packageId}, ${amount}, ${price}, ${saleId} );`
    );

    await queryRunner.release();

    return result;
  }


  

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    
    const { userId, saleId, transactionId, isSuccess } = createTransactionDto; 

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    // El segundo parametro es el id venta

    var result = await queryRunner.manager.query(
      `call publish_tran( ${userId}, ${saleId}, '${transactionId}', ${isSuccess ? 1 : 0}, null, null );`
    );

    await queryRunner.release(); 

    return result;
 
  }

}
