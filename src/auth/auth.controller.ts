import { Controller, Post, Headers, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { RequestHeaders } from './decorators/login.decorator';
import { LoginValidationDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @RequestHeaders(new ValidationPipe({ validateCustomDecorators: true }))
    @Headers()
    headers: LoginValidationDto,
  ) {
    console.log('Ss');
    return this.authService.login(headers);
  }
}
