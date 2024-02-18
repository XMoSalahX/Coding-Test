import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    manager: EntityManager,
  ) {
    super(User, manager);
  }
}
