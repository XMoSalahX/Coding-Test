import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';

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
