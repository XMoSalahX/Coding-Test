import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {}
