import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PackagesService {

  constructor( private readonly dataSource: DataSource ){}
 
  async findAll() {

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    let result = await queryRunner.manager.query(
      "SELECT p.`name`, p.packageId, p.price,(IF(p.discount IS NULL,p.price,(p.price - p.discount))) as discount, CONCAT(p.time, ' ', s.`name`) as time FROM package as p INNER JOIN s_package as s ON p.timeid = s.timeid WHERE p.online = 1"
    );

    await queryRunner.release();

    return result;

  }

}
