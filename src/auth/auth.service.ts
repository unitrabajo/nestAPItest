import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, ChangePasswordDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { googleVerify } from './helpers/google_verify';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {

  private readonly logger: Logger = new Logger('AuthService');

  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>,
               private readonly jwtService: JwtService,
               private readonly dataSource: DataSource,
               private readonly mailService: MailService ){}

  async register(createUserDto: CreateUserDto) {
    
    try {

      const { password, email, ...userData } = createUserDto;

      const exist = await this.userRepository.findOne({ where: { email } });

      if ( exist ) {
        return new BadRequestException({message: 'Ya existe un usuario con ese correo electrónico.'})
      }
 
      const salt = bcrypt.genSaltSync();

      const user = this.userRepository.create({
        ...userData,
        email,
        pass: bcrypt.hashSync( password, salt )
      });

      await this.userRepository.save( user );

      // No retornar la contraseña
      delete user.pass;

      return {
        status: true,
        user,
        accessToken: this.getJwtToken( {id: user.userid} )
      };

    } catch (error) {
      this.handleExceptions(error)
    }


  }


  async login( loginUserDto: LoginUserDto ) {


    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({ 
      where: { email },
      select: { email: true, pass: true, userid: true }
    });

    if ( !user ) {
      throw new UnauthorizedException(`Credentials are not valid.`)
    }

    if ( !bcrypt.compareSync(password, user.pass) ) {
      throw new UnauthorizedException(`Credentials are not valid.`)
    }

    return {
      status: true,
      user,
      accessToken: this.getJwtToken( {id: user.userid} )
    };

  }



  async renewToken( user: User ) {

    console.log(user)
    if ( !user ) throw new UnauthorizedException(`Unauthorized`)

    return {
      status: true,
      user,
      accessToken: this.getJwtToken( {id: user.userid} )
    };

  }



  async googleSignIn( googleToken: string ) {

    try {

      const { name, email, picture } = await googleVerify( googleToken )

      let user = await this.userRepository.findOneBy({email});

      if ( user ) {
        user.name = name;
        user.isGoogle = true;
        user.imagesperfil = picture;
        this.userRepository.save(user);
      } else {
        user = this.userRepository.create({name, email, imagesperfil: picture, isGoogle: true});
        await this.userRepository.save( user );
      }


      return {
        status: true,
        user,
        accessToken: this.getJwtToken( {id: user.userid } )
      }

    } catch(error) {
      this.handleExceptions(error)
    }

  }



  private getJwtToken( payload: JwtPayload ){
    const accessToken = this.jwtService.sign( payload );
    return accessToken;
  }



  async resetPassword( resetPasswordDto: ResetPasswordDto ) {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    const { email } = resetPasswordDto;

    const userResult = await queryRunner.manager.query(
      'SELECT * FROM g_users WHERE email = ?;',
      [ email ]
    )

    if ( !userResult[0] ) {
      return new NotFoundException('No existe un usuario con el email ' + email)
    }

    await queryRunner.manager.query(
      'UPDATE g_passwordForget SET online = 0 WHERE userid = ?;',
      [userResult[0].userid]
    )

    const token = uuidv4();

    await queryRunner.manager.query(
      "INSERT INTO g_passwordForget(url, userid, online) VALUES (?, ?, ?)",
      [token, userResult[0].userid, 1] 
    );
    

    await queryRunner.release();

    await this.mailService.sendEmailToken(email, token)

    return {
      status: true,
      token,
    };
  }


  async changePassword(changePasswordDto: ChangePasswordDto) {

    const { token, newPassword } = changePasswordDto;

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();


    const result = await queryRunner.manager.query(
      'SELECT * FROM g_passwordForget WHERE url = ?;',
      [ token ]
    )

    if ( !result[0] ) {
      return new BadRequestException({ message: 'Token inválido' })
    }

    const salt = bcrypt.genSaltSync();

    await queryRunner.manager.query(
      'UPDATE g_users SET pass = ? WHERE userid = ?;',
      [ bcrypt.hashSync( newPassword, salt ), result[0].userid ]
    )

    await queryRunner.manager.query(
      'UPDATE g_passwordForget SET online = 0 WHERE userid = ?;',
      [ result[0].userid ]
    )

    await queryRunner.release();

    return {
      status: true,
      message: 'Contraseña actualizada con éxito.',
    };

  }




  async changePasswordsNewEncript() {

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    const salt = bcrypt.genSaltSync();

    const users = await queryRunner.manager.query(
      "SELECT userid, secret, pass FROM g_users", 
    );

    users.forEach( user => {
      if ( !user.secret ) return;
      queryRunner.manager.query( 'UPDATE g_users SET pass = ? WHERE userid = ?', [bcrypt.hashSync(user.secret, salt ), user.userid] )
    });

    await queryRunner.release();

    return {
      status: true,
      message: 'Credenciales actualizadas con éxito.'
    }; 

    
  }


  private handleExceptions( error: any ) {
    if ( error.code === '23505' ) {
      throw new BadRequestException({ status:false, message: error.detail })
    }

    this.logger.error(error)
    throw new InternalServerErrorException(`Unexpected error, check server logs.`)
  }

}
