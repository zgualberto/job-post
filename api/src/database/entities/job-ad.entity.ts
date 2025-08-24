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

  @Column({ type: 'varchar', length: 255, nullable: true })
  office: string | null;

  @Column({ default: false })
  is_external: boolean;

  @Column({ type: 'varchar', length: 255, default: 'system' })
  external_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  external_id: string | null;

  @Column({
    type: 'int',
    default: 2,
    comment: '1 for Published, 2 for Draft, 3 for Archived, 4 for Denied',
  })
  job_ad_action_id: number;

  @Column({ type: 'text', nullable: true })
  metadata: string | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
