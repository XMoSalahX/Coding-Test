import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  title: string;

  @Column({
    type: String,
  })
  content: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  timestamp?: Date;

  @Column({
    type: Number,
  })
  authorId: number;

  @Column({
    type: Boolean,
    default: true,
  })
  status: boolean;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}
