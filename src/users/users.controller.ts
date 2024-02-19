import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserTypeEnum } from './enums/usertype';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.EDITOR)
  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @AuthUser() user, @Param('id') id: number) {
    console.log(user);
    return this.usersService.update(updateUserDto, user, id);
  }
}
