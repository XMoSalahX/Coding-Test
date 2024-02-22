import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from '../../src/posts/posts.module';

describe('Posts Operation Validation: (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PostsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'postgres',
          port: 5433,
          username: 'postgres',
          password: 'postgres',
          database: 'posts-test',
          entities: ['../../*.entity.ts'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create posts based on role [Post /posts]');
  it.todo('Get all posts based on role [Get //posts?id=:id]');
  it.todo('Get one posts based on role [Get /posts/:id]');
  it.todo('Update one posts based on role [Patch /posts/:id]');
  it.todo('Remove one posts based on role [Patch /posts/:id]');
});
