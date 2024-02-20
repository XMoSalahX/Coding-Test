import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserTypeEnum } from 'src/users/enums/usertype';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Posts } from './entities/post.entity';
import { AuthUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.EDITOR)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user): Promise<Posts> {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiQuery({
    type: Number,
    name: 'id',
    required: false,
  })
  findAll(@AuthUser() user, @Param('id') id?: number): Promise<Posts[]> {
    return this.postsService.findAll(user, id);
  }

  @Get(':id')
  findOne(@AuthUser() user, @Param('id') id: number): Promise<Posts> {
    return this.postsService.findOne(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.EDITOR)
  @Patch(':id')
  update(@AuthUser() user, @Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(user, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.EDITOR)
  @Delete(':id')
  async remove(@AuthUser() user, @Param('id') id: number): Promise<string> {
    await this.postsService.remove(user, id);
    return 'Post has been removed successfuly.';
  }
}
