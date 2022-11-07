import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { googleVerify } from '../helpers/google_verify';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {

  constructor( private readonly dataSource: DataSource ){}

  async create(createAuthDto: CreateAuthDto) {

    try {

      const { name, email, picture }  = await googleVerify(createAuthDto.token);

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.startTransaction();
  
      let result = await queryRunner.manager.query("select * from g_users where email = ?", [email])

      if ( result[0] ) {
        // Editar al usuario
        await queryRunner.manager.query("update g_users set name = ?, isGoogle = 1, imagesperfil = ? where email = ?", [name, picture, email])
      } else {
        // Crear su usuario
        await queryRunner.manager.query("insert into g_users (name, isGoogle, imagesperfil, email) values (?, 1, ?, ?)", [name, picture, email])
      }

      const user = await queryRunner.manager.query("select * from g_users where email = ?", [email])

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // mario.garcia@kwmexico.mx - email
      // GARCIA VAZQUEZ MARIO JESUS - name
      // 5747

      return {
        status: true,
        folio: user[0]['userid']
      };

  } catch(e) {
      return {
          status: false,
          message: 'Token inválido'
      }
  }


    
    
    
    

  }

 
}
