import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ILoginResponse } from './interfaces/login.interfac';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOne({ username: payload.userName });
  }

  async login(user: { username: string; password: string }): Promise<ILoginResponse> {
    const { username, password } = user;

    const userFromDb = await this.usersService.findOne({ username }, password);
    const payload: JwtPayload = { userName: user.username, password: userFromDb.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
