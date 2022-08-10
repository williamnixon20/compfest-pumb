import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username, password }) {
    const validate = this.validateUser(username, password);
    if (!validate) throw new UnauthorizedException();
    const payload = {
      username: username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto) {
    return createUserDto;
  }
}
