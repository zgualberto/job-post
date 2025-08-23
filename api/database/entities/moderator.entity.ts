import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moderators')
export class Moderator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  otp: number;
}
