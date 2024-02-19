import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from './enums/usertype';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUND));
    return await this.userRepository.createBase(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }
  async findOneJWT(filter: { id?: number; username?: string }, password?: string): Promise<User> {
    console.log(filter);
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.posts', 'posts', 'posts.status = :status')
        .setParameter('status', true);

      // Conditionally add the 'where' clause based on the properties of the filter
      if (filter.id !== undefined) {
        queryBuilder.andWhere('user.id = :id', { id: filter.id });
      }
      if (filter.username !== undefined) {
        queryBuilder.andWhere('user.username = :username', { username: filter.username });
      }

      const doc = await queryBuilder.getOne();

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

  async findOne(filter: { id?: number; username?: string; password?: string }): Promise<User> {
    try {
      const doc: User = await this.userRepository.findOne({ where: filter });
      if (!doc) throw new UnauthorizedException(`User ${filter?.id ? filter?.id : filter.username} not found`);
      return doc;
    } catch (error) {
      console.error('Error finding user:', error.message);
      throw error;
    }
  }

  async update(updateUserDto: UpdateUserDto, user: User, id: number) {
    let userFromDb: User;
    if (user.userType === UserTypeEnum.ADMIN) {
      userFromDb = await this.userRepository.findOne({ where: { id } });
    } else {
      // if role not admin get editor only
      userFromDb = await this.userRepository.findOne({ where: { id, userType: Not(UserTypeEnum.ADMIN) } });
    }

    if (!userFromDb) {
      throw new Error(`User not found`);
    }
    // Update the user object with the provided data
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }
}
