import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto).catch((err) => {
      throw new UnauthorizedException('Failed to login!', err.message);
    });
  }

  @Public()
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.role === UserRole.ADMIN)
      throw new UnauthorizedException('Cant create admin!');
    return this.authService.signup(createUserDto).catch((err) => {
      throw new BadRequestException(
        'Email or Username might be taken',
        err.message,
      );
    });
  }

  @ApiBearerAuth()
  @Get('/test')
  async test(@Request() req) {
    return req.user;
  }
}
