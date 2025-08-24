import {
  Entity,
  Column,
  PrimaryColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('job_ads')
@Unique(['external_id', 'external_name'])
export class JobAd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  office: string;

  @Column({ default: false })
  is_external: boolean;

  @Column({ type: 'varchar', length: 255, default: 'system' })
  external_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column('bigint')
  external_id: string;

  @Column({ type: 'int', default: 2 })
  job_ad_action_id: number;

  @Column({ type: 'text' })
  metadata: string;
}
