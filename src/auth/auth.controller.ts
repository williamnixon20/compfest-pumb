import { Controller, Request, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginUserDto: any) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('/signup')
  async signup(@Body() createUserDto: any) {
    return this.authService.signup(createUserDto);
  }

  @Get('/test')
  async test(@Request() req) {
    return req.user;
  }

  @Get('/trial')
  async trial(@Request() req) {
    return 'ok';
  }
}
