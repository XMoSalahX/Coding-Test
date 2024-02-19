import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeEnum } from '../enums/usertype';
import { Posts } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    default: UserTypeEnum.READER,
  })
  userType: UserTypeEnum;

  @Column()
  password: string;

  @OneToMany(type => Posts, post => post.auther)
  posts: Posts[];
}
