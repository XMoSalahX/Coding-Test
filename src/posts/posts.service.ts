import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './post.repository';
import { User } from 'src/users/entities/user.entity';
import { Posts } from './entities/post.entity';
import { UserTypeEnum } from 'src/users/enums/usertype';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Posts> {
    // inject auther id
    createPostDto.authorId = user.id;
    return await this.postRepository.createBase(createPostDto);
  }

  async findAll(user: User, id?: number): Promise<Posts[]> {
    if (user.userType === UserTypeEnum.READER) {
      return await this.postRepository.find({ where: { authorId: user.id, status: true } });
    } else {
      return await this.postRepository.find({ where: { authorId: id || user.id, status: true } });
    }
  }

  async findOne(user: User, id?: number): Promise<Posts> {
    if (user.userType === UserTypeEnum.READER) {
      return await this.postRepository.findOne({ where: { id, authorId: user.id, status: true } });
    } else {
      return await this.postRepository.findOne({ where: { id, status: true } });
    }
  }

  async update(user: User, id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    let postFromDb: Posts;
    if (user.userType === UserTypeEnum.ADMIN || user.userType === UserTypeEnum.EDITOR) {
      postFromDb = await this.postRepository.findOne({ where: { id, status: true } });
    } else {
      // if Reader only
      postFromDb = await this.postRepository.findOne({ where: { id, authorId: user.id, status: true } });
    }

    if (!postFromDb) {
      throw new NotFoundException('Document not found');
    }

    // Update the user object with the provided data
    Object.assign(postFromDb, updatePostDto);

    return this.postRepository.save(postFromDb);
  }

  async remove(user: User, id: number) {
    let postFromDb: Posts;
    if (user.userType === UserTypeEnum.ADMIN || user.userType === UserTypeEnum.EDITOR) {
      postFromDb = await this.postRepository.findOne({ where: { id, status: true } });
    } else {
      // if Reader only
      postFromDb = await this.postRepository.findOne({ where: { id, authorId: user.id, status: true } });
    }

    if (!postFromDb) {
      throw new NotFoundException('Document not found');
    }

    // Update the user object with the provided data
    Object.assign(postFromDb, { status: false });

    await this.postRepository.save(postFromDb);
  }
}
