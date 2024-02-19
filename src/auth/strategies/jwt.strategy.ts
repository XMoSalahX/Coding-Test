import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private reflector: Reflector,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    // Fetch user details from the database based on the JWT payload
    const { username, password } = payload;
    const user = await this.usersService.findOne({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
