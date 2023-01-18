import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { CreateUserDto, LoginUserDto, GoogleSinginDto, ResetPasswordDto, ChangePasswordDto } from './dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }


  @Post('login')
  login(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Post('login/admin')
  loginAdmin(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.loginAdmin( loginUserDto );
  }



  @Post('google')
  googleSingIn( @Body() googleSinginDto: GoogleSinginDto ) {
    const { googleToken } = googleSinginDto;
    return this.authService.googleSignIn( googleToken );
  }


  @Get('renew')
  @UseGuards( AuthGuard() )
  renew(
    @GetUser() user: User,
    ) {
    return this.authService.renewToken( user );
  }



  @Post('reset/password')
  resetPassword( @Body() resetPasswordDto: ResetPasswordDto ) {
    return this.authService.resetPassword(resetPasswordDto);
  }


  @Post('change/password')
  changePassword( @Body() changePasswordDto: ChangePasswordDto ) {
    return this.authService.changePassword(changePasswordDto);
  }



  @Get('seed')
  seed() {
    return this.authService.changePasswordsNewEncript();
  }

}
