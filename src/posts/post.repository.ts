import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { BaseAbstractRepository } from '../utils/base.abstract.repository';

@Injectable()
export class PostsRepository extends BaseAbstractRepository<Posts> {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    manager: EntityManager,
  ) {
    super(Posts, manager);
  }
}
