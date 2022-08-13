import { Controller, Request, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiBearerAuth()
  @Get('/me')
  async test(@Request() req) {
    return req.user;
  }
}
