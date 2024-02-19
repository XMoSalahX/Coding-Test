import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @ManyToOne(() => User, user => user.id)
  author: User;
}
