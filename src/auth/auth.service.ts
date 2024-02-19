import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOne({ username: payload.userName });
  }

  async login(user: { username: string; password: string }) {
    const { username, password } = user;

    const userFromDb = await this.usersService.findOne({ username }, password);
    console.log(userFromDb);
    const payload: JwtPayload = { userName: user.username, password: userFromDb.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
