import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_ad_actions')
export class JobAdAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
