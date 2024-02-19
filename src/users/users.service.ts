import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
// import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    // private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUND));
    return await this.userRepository.createBase(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }
  async findOne(filter: { id?: number; username?: string }, password?: string) {
    try {
      const doc: User = await this.userRepository.findOne({ where: filter });
      const isValid = await bcrypt.compare(password, doc.password);
      if (!isValid) {
        throw new UnauthorizedException(`User ${filter?.id ? filter?.id : filter.username} not found`);
      }
      return doc;
    } catch (error) {
      console.error('Error finding user:', error.message);
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
