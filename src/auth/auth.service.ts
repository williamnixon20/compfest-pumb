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
    username: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    role: UserRole;
    status?: string;
  }> {
    try {
      const user = await this.usersService.findUser({
        username: loginUserData.username,
      });
      const isPasswordMatch = await bcrypt.compare(
        loginUserData.password,
        user.password,
      );
      if (user && isPasswordMatch) {
        const { password, ...result } = user;
        return result;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(loginUserData: LoginUserDto) {
    try {
      const validate = await this.validateUser(loginUserData);
      if (!validate) throw new UnauthorizedException('Failed to login!');
      const payload = {
        id: validate.id,
        email: validate.email,
        username: validate.username,
        role: validate.role,
        status: validate?.status,
      };
      return {
        message: 'Success!',
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw new BadRequestException(
        'Failed to login. Are you sure your data is correct?',
        err.message,
      );
    }
  }

  async signup(createUserDto: CreateUserDto) {
    // if (createUserDto.role === UserRole.ADMIN)
    //   throw new UnauthorizedException('Cant create admin!');
    try {
      const { password, ...result } = await this.usersService.createUser(
        createUserDto,
      );
      return {
        message: 'Success!',
        data: { ...result },
      };
    } catch (err) {
      throw new BadRequestException(
        'Failed to signup! Email or username might be taken',
        err.message,
      );
    }
  }
}
