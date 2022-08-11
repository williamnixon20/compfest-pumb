import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(loginUserData: LoginUserDto): Promise<{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    role: UserRole;
    status?: string;
  }> {
    const user = await this.usersService.findUser({
      email: loginUserData.email,
    });
    const isPasswordMatch = await bcrypt.compare(
      loginUserData.password,
      user.password,
    );
    if (user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Failed to login!');
  }

  async login(loginUserData: LoginUserDto) {
    const validate = await this.validateUser(loginUserData);
    if (!validate) throw new UnauthorizedException('Failed to login!');
    const payload = {
      user_id: validate.id,
      email: validate.email,
      role: validate.role,
      status: validate?.status,
    };
    return {
      message: 'Success!',
      data: { access_token: this.jwtService.sign(payload) },
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const { password, ...result } = await this.usersService.createUser(
      createUserDto,
    );
    if (!result) throw new BadRequestException('Email or Username taken');
    return {
      message: 'Success!',
      data: { ...result },
    };
  }
}
