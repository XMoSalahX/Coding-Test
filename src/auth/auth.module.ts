import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
// import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  // providers: [AuthService, LocalStrategy, JwtStrategys],
  exports: [AuthService],
})
export class AuthModule {}
