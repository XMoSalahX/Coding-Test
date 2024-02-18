import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private connection: Connection,
  ) {}

  async create(createPostDto: CreateUserDto) {
    return await this.userRepository.createBase(createPostDto);
  }

  findAll() {
    return `This action returns all users`;
  }
  async findById(id: number) {
    try {
      const doc = await this.userRepository.findOne({ where: { id } });
      if (!doc) {
        throw new Error(`User with ID ${id} not found`);
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
