import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AuthService {

  private readonly logger: Logger = new Logger('AuthService');

  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>,
               private readonly jwtService: JwtService,
               private readonly dataSource: DataSource ){}

  async register(createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
 
      const salt = bcrypt.genSaltSync();

      const user = this.userRepository.create({
        ...userData,
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
      // accessToken: this.getJwtToken( {id: user.id} )
    };

  }



  private getJwtToken( payload: JwtPayload ){
    const accessToken = this.jwtService.sign( payload );
    return accessToken;
  }





  private handleExceptions( error: any ) {
    if ( error.code === '23505' ) {
      throw new BadRequestException({ status:false, message: error.detail })
    }

    this.logger.error(error)
    throw new InternalServerErrorException(`Unexpected error, check server logs.`)
  }


  async findAll( paginationDto: PaginationDto ) {

    // const { limit = 20, offset = 1 } = paginationDto;

    // const [ results, totalResults ] = await Promise.all([
    //   this.userRepository.find({
    //     take: limit,
    //     skip: ( page - 1 ) * limit,
    //   }),
    //   this.userRepository.count()
    // ])

    // return { results, totalResults }

  }



  async changePasswords() {

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

}
