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
    return await this.usersService.findOne({ username: payload.username });
  }

  async login(user: { username: string; password: string }): Promise<ILoginResponse> {
    const { username, password } = user;

    const userFromDb = await this.usersService.findOneJWT({ username }, password);
    const payload: JwtPayload = {
      username: user.username,
      password: userFromDb.password,
      userType: userFromDb.userType,
    };

    return {
      access_token: this.jwtService.sign(payload),
      body: userFromDb,
    };
  }
}
