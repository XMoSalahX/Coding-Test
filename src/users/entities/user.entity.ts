import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeEnum } from '../enums/usertype';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  FirstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    default: UserTypeEnum.READER,
  })
  userType: UserTypeEnum;
}
